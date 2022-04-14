import React from "react"
import axios from "axios"
import _ from 'lodash'
import './CreatePropertyComp.scss'
import CustomInput from "../CustomInput/CustomInput"
import CustomTextarea from "../CustomTextarea/CustomTextarea"
import CustomToggle from "../CustomToggle/CustomToggle"
import { useHttp } from '../../hooks/http.hook'
import { AuthContex } from "../../context/AuthContext"

export default function CreatePropertyComp() {

   const auth = React.useContext(AuthContex)

   const {loading, request, error, cleareError} = useHttp()

   const [success, setSuccess] = React.useState(false)

   const [propertyForm, setPropertyForm] = React.useState({landlordId: auth.userId})

   const [files, setFiles] = React.useState([])
   // const [file, setFile] = React.useState([])
   // console.log(files)

   const changeHandler = event => {
      setPropertyForm({...propertyForm, [event.target.name]: event.target.value})
   }

   const [currency, setCurrency] = React.useState('₽')
   const [showCurrency, setShowCurrency] = React.useState(false)
   const toggleCurrnecyList = () => setShowCurrency(!showCurrency)

   const [per, setPer] = React.useState('месяц')
   const [showPer, setShowPer] = React.useState(false)
   const togglePerList = () => setShowPer(!showPer)

   const [conveniences, setConveniences] = React.useState([])
   const addConvenience = (event) => {
      const isChecked = event.target.checked
      if (isChecked) {
         setConveniences([...conveniences, event.target.value])
      } else {
         setConveniences(prevConveniences => prevConveniences.filter((_, index) => index !== prevConveniences.length - 1))
      }
   }

   const currencyRef = React.useRef(null);
   const perRef = React.useRef(null);

   // * Detects click outside menu component
   React.useEffect(() => {
      const checkIfClickedOutside = e => {
         if (showCurrency && currencyRef.current && !currencyRef.current.contains(e.target)) {
            toggleCurrnecyList()
         } 
         if (showPer && perRef.current && !perRef.current.contains(e.target)) {
            togglePerList()
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [showCurrency, showPer])

   const [progress, setProgress] = React.useState()

   const createHandler = async (e) => {
      e.preventDefault()

      const coordinates = []
      fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOCODER_TOKEN}&query=${propertyForm.address}`)
         .then(response => response.json())
         .then(data => coordinates.push(data.data[0].longitude, data.data[0].latitude))
      setPropertyForm({...propertyForm, currency: currency, per: per, conveniences: [...conveniences], coordinates: coordinates})

      const createProperty = {...propertyForm}

      const propertyImages = []

      if (files) {
         for (const file in files) {
            const data = new FormData()
            const fileName = Date.now() + files[file].name
            propertyImages.push(fileName)
            data.append("name", fileName)
            data.append("file", files[file])
            const upload = async () => {
               try {
                  await axios.post("/api/upload", data,
                  {
                     headers: {
                        "Content-Type": "multipart/form-data",
                     },
                     onUploadProgress: data => {
                        //Set the progress value to show the progress bar
                        setProgress(Math.round((100 * data.loaded) / data.total))
                     },
                  })
               } catch (err) {}
            }
            upload()
         }
         propertyImages.splice(propertyImages.length - 2, 2)
         createProperty.images = propertyImages
      }

      try {
         // console.log(propertyForm)
         const data = await request('/api/apartments', 'POST', createProperty, {token: `Bearer ${auth.token}`})
         setSuccess(true)
      } catch (error) {}
   }

   return (
      <form className="create-property-comp" onSubmit={createHandler}>
         <h2 className="title">Добавление записи о недвижимости</h2>
         <CustomInput label="Заголовок" name="title" type="text" handleChange={changeHandler} />
         <CustomInput label="Адрес" name="address" type="text" handleChange={changeHandler} />
         <div className="price">
            <CustomInput label="Цена" name="amount" type="number" handleChange={changeHandler} />
            <label ref={currencyRef} className="select" data-visible={showCurrency} onClick={toggleCurrnecyList}>{currency}
               <ul>
                  {currency !== '₽' && <li onClick={() => {setCurrency('₽'); toggleCurrnecyList()}}>₽</li>}
                  {currency !== '$' && <li onClick={() => {setCurrency('$'); toggleCurrnecyList()}}>$</li>}
                  {currency !== '€' && <li onClick={() => {setCurrency('€'); toggleCurrnecyList()}}>€</li>}
               </ul>
            </label>
            <label ref={perRef} className="select" data-visible={showPer} onClick={togglePerList}> /{per}
               <ul>
                  {per !== 'месяц' && <li onClick={() => {setPer('месяц'); togglePerList()}}>месяц</li>}
                  {per !== 'день' && <li onClick={() => {setPer('день'); togglePerList()}}>день</li>}
                  {per !== 'час' && <li onClick={() => {setPer('час'); togglePerList()}}>час</li>}
               </ul>
            </label>
         </div>
         <div className="stats">
            <CustomInput label="Этаж" name="floor" type="number" handleChange={changeHandler} />
            <CustomInput label="Площадь (&#13217;)" name="area" type="number" handleChange={changeHandler} />
            <CustomInput label="Кол-во комнат" name="rooms" type="number" handleChange={changeHandler} />
         </div>
         <CustomTextarea label="Описание" name="desc" handleChange={changeHandler} />
         <div className="conviniences">
            <CustomToggle name='кухня' label="Кухня" checked={false} onChange={addConvenience} />
            <CustomToggle name='wifi' label="Wifi" checked={false} onChange={addConvenience} />
            <CustomToggle name='кондиционер' label="Кондиционер" checked={false} onChange={addConvenience} />
            <CustomToggle name='балкон' label="Балкон" checked={false} onChange={addConvenience} />
            <CustomToggle name='стриальная машина' label="Стиральная машина" checked={false} onChange={addConvenience} />
            <CustomToggle name='паркинг' label="Парковка" checked={false} onChange={addConvenience} />
            <CustomToggle name='можно с животными' label="Можно с животными" checked={false} onChange={addConvenience} />
         </div>
         <input
            type="file"
            multiple 
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFiles(e.target.files)}
            />
         <input type="submit" className="submit-btn" value="Выполнить" />
         {/* <button className="submit-btn" onClick={createHandler} disabled={loading}>Выполнить</button> */}
         {progress && (progress === 100 ? <h1 className="success">{progress}%</h1> : <h1 className="error">Загрузка...</h1>) }
         {success && <h4 className="success">Запись успешно создана.</h4>}
         {error && <h4 className="error">{error}</h4>}
      </form>
      
   )
}