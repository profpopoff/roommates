import React from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import './ApartmentInfo.scss'
import ReactMapboxGl, { ZoomControl, RotationControl, Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import image from '../../assets/test.jpg'
import roommate from '../../assets/roommate1.png'
import StarRatings from 'react-star-ratings'
import { useHttp } from '../../hooks/http.hook'
import RoommatePicture from "../RoommatePicture/RoommatePicture"
import userImg from '../../assets/default-user.png'
import CustomInput from "../CustomInput/CustomInput"
import Modal from "../Modal/Modal"
import { AuthContex } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid, faPhone, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faComments } from '@fortawesome/free-regular-svg-icons'

const MapGL = ReactMapboxGl({
   accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
   pitchWithRotate: false
});

export default function ApartmentInfo(props) {

   const auth = React.useContext(AuthContex)

   const navigate = useNavigate();

   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   const [landlordData, setLandlordData] = React.useState()

   const changeMapLanguage = (map) => {
      map.getStyle().layers.forEach((layer) => {
          if (layer.id.endsWith('-label')) {
              map.setLayoutProperty(layer.id, 'text-field', [
                  'coalesce',
                  ['get', 'name_ru'],
                  ['get', 'name'],
              ]);
          }
      });
   };

   React.useEffect(() => {
      const getUser = async () => {
         try {
            const res = await axios.get('/api/users/find/' + props.landlordId)
            setLandlordData(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      getUser()
   }, [])

   const createConverstion = async () => {
      try {
         const res = await axios.post('/api/conversations', {senderId: auth.userId, receiverId: landlordData._id})
         navigate("/chats");
      } catch (error) {
         console.log(error)
      }
   }

   const [isFavourite, setIsFavourite] = React.useState(false)

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)
   
   const [isActive, setIsActive] = React.useState(0)
   
   const [activeImg, setActiveImg] = React.useState()
   
   React.useEffect(() => {
      setActiveImg(props.images[isActive])
   }, [isActive])
   
   const imageElements = props.images.map((image, index) => (
      <img key={image} src={PF + image} alt="appimage" className="inactive-image" onClick={() => setIsActive(index)} />
   ))

   const {loading, request, error} = useHttp()
   const [loginActive, setLoginActive] = React.useState(false)
   const [loginForm, setLoginForm] = React.useState({})

   const changeLoginHandler = event => {
      setLoginForm({...loginForm, [event.target.name]: event.target.value})
   }
   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...loginForm})
         auth.login(data.token, data._id, data.fullName, data.email, data.phoneNumber, data.profilePicture)
         setLoginActive(false)
      } catch (error) {}
   }

   const ratings = [] 
   props.reviews && props.reviews.map(review => ratings.push(review.rating))
   const average = (nums) =>{
      if (nums[0]) {
         return nums.reduce((a, b) => (a + b)) / nums.length
      } 
      return 0
   }

   const [rms, setRms] = React.useState([])

   const photo = (id) => {
      const getrm = async () => {
         try {
            const res = await axios.get('/api/users/find/' + id)
            // console.log(res.data)
            setRms(prevRms => [...prevRms, res.data])
         } catch (error) {
            console.log(error)
         }
      }
      getrm()
   }

   React.useEffect(() => {
      if (props.roommates) {
         for(let i in props.roommates) {
            photo(props.roommates[i])
         }
      }
   }, [props.roommates])

   let names = rms.map(rm => rm.fullName.split(" ")[0])

   const rmsPicture = rms?.map(rm => (
      <div className="blya-kakzhe-ya-zaebalsya">
         <img key={rm.profilePicture} src={PF + rm.profilePicture} alt="" className="roommate-img" />
         <FontAwesomeIcon icon={faComments} className="icon-chat" />
      </div>
   ))

   return (
      <div className="apartment-info">
         <div className="apartment-info--images">
            <div className="active-image">
               <img className="image" src={PF + activeImg} alt="appimage" />
               <button className="next-btn img-btn" onClick={isActive === props.images.length - 1 ? () => setIsActive(0) : () => setIsActive(isActive + 1)}>
                  <FontAwesomeIcon icon={faAngleRight} className="icon" />
               </button>
               <button className="prev-btn img-btn" onClick={isActive === 0 ? () => setIsActive(props.images.length - 1) : () => setIsActive(isActive - 1)}>
                  <FontAwesomeIcon icon={faAngleLeft} className="icon" />
               </button>
            </div>
            <div className="inactive-images">
               {imageElements}
            </div>
         </div>
         <article className="apartment-info--article">
            <h1 className="title">{props.title}</h1>
            <h3 className="address">
               <FontAwesomeIcon icon={faLocationDot} className="icon" /> {props.city}, {props.street}, д.{props.houseNum}, кв.{props.apartmentNum}
            </h3>
            <h2 className="price"><span>{props.currency}{props.amount}</span> /{props.per}</h2>
            {
               ratings.length > 0 &&  
               <div className="rating">
                  <span className="num">{average(ratings).toString().substring(0,3)}</span>
                  <StarRatings
                     rating={average(ratings)}
                     starRatedColor="blue"
                     starDimension="22"
                     starSpacing="2"
                     starHoverColor="blue"
                     name='rating'
                  />
               </div> 
            }
            
            {
               props.roommates[0] && 
                  <div className="roommates">
                     <div className="imgs">
                        {rmsPicture}
                     </div>
                        <div className="rms-text">
                           {props.roommates?.length} сосед{props.roommates?.length > 1 ? props.roommates?.length > 4 ? 'ей' : 'а' : ''}
                           <h5>{names.join(', ').replace(/, ([^,]*)$/, ' и $1')}</h5>
                        </div>
                  </div>
            }
         </article>
         <div className="apartment-info--landlord">
            <div className="who">
               <h3 className="role">Арендодатель</h3>
               {/* <a href="tel: +7950-220-9953" className="phone-number">{landlordData?.phoneNumber}</a> */}
               <h2 className="name">{landlordData?.fullName}</h2>
            </div>
            <div className="img-block">
               <picture className="landlord-photo">
               <img src={landlordData?.profilePicture ? PF + landlordData.profilePicture : userImg} alt="landlord image" />
            </picture>
            {
               auth.isAuthenticated ? 
               <button 
               className="chat-link" 
               onClick={createConverstion}
               >
                  <FontAwesomeIcon icon={faComments} className="icon" />
                  <span className="sr-only">Начать чат с арендатором</span>
               </button>
               :
               <div className="login">
                  <button className='chat-link' onClick={() => {setLoginActive(true)}}>
                     <FontAwesomeIcon icon={faComments} className="icon" />
                     <span className="sr-only">Начать чат с арендатором</span>
                  </button>
                  <Modal active = {loginActive} setActive={setLoginActive}>
                        <h2 className="title">Вход</h2>
                        <form action="/">
                           <CustomInput 
                              name='email'
                              label='Email'
                              type='email'
                              handleChange={changeLoginHandler}
                           />
                           <CustomInput 
                              name='password'
                              label='Password'
                              type='password'
                              handleChange={changeLoginHandler}
                           />
                           <button className="submit-btn" onClick={loginHandler} disabled={loading}>Войти</button>
                           {error && <h4 className='error'>{error}</h4>}
                           <h4 className="creat-profile">
                              Нет аккаунта? <Link to={process.env.PUBLIC_URL + '/register'}>Зарегистрируйтесь...</Link>
                           </h4>
                           
                        </form>
                     </Modal>
               </div>
            }
            
            </div>
            
            
         </div>
         <div className="apartment-info--roommates">
            {/* <div className="photos">
               <picture className="roommate-photo">
                  <img src={roommate} alt="roommate photo" />
               </picture>
               <picture className="roommate-photo">
                  <img src={roommate} alt="roommate photo" />
               </picture>
               <picture className="roommate-photo">
                  <img src={roommate} alt="roommate photo" />
               </picture>
            </div>
            <h3 className="roommates-number">3 соседа</h3>
            <span className="roommates-names">Roni, Alex and Mike</span> */}
         </div>
            <button className="apartment-info--add-to-favourites" onClick={toggleIsFavourite}>
               {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
            </button>
         <ul className="apartment-info--conveniences">
            {props.conveniences?.map((convenience) => (
               <li key={convenience}>{convenience}</li>
            ))}
         </ul>
         <div className="apartment-info--stats">
            <div className="floor info">
               <h3 className="stat">этаж</h3>
               <h2 className="value">{props.floor}</h2>
            </div>
            <div className="area info">
               <h3 className="stat">площадь</h3>
               <h2 className="value">{props.area}&#13217;</h2>
            </div>
            <div className="rooms info">
               <h3 className="stat">{`комнат${props.rooms < 2 ? 'a' : ''}`}</h3>
               <h2 className="value">{props.rooms}</h2>
            </div>
         </div>
         <div className="apartment-info--desc">
            <div className="map">
               <MapGL
                  className='mapbox'
                  style="mapbox://styles/mapbox/streets-v11"
                  center={props.coordinates}
                  zoom={[16]}
                  containerStyle={{
                     height: '100%',
                     width: '100%'
                  }}
                  renderChildrenInPortal={true}
                  onStyleLoad={changeMapLanguage}
               >
                  <Marker 
                     className='marker'
                     coordinates={props.coordinates}
                     anchor={"bottom"}
                  >
                     <FontAwesomeIcon 
                        icon={faLocationDot} 
                        className='pin'
                     />
                  </Marker>
                  <ZoomControl />
                  <RotationControl />
               </MapGL>
            </div>
            <p className="text">{props.desc}</p>
         </div>
         
      </div>
   )
}