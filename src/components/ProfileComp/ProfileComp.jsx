import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import './ProfileComp.scss'
import FileBase64 from 'react-file-base64'
import userImg from '../../assets/default-user.png'
import { AuthContex } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faPenToSquare, faComments, faHeart, faBuilding, faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal/Modal"
import CustomInput from "../CustomInput/CustomInput"
import Loading from "../Loading/Loading"

export default function Profile() {

   const auth = React.useContext(AuthContex)
   
   const [isLoading, setIsLoading] = React.useState(true)

   const { loading, request, error } = useHttp()

   const PF = process.env.REACT_APP_PUBLIC_FOLDER

   const [editActive, setEditActive] = React.useState(false)

   const [editForm, setEditForm] = React.useState({})

   const [home, setHome] = React.useState()

   React.useEffect(() => {
      fetch(`/api/apartments/`)
         .then((response) => response.json())
         .then((data) => {
            setHome(data.find(apartment => apartment.roommates.includes(auth.userId)))
            setIsLoading(false)
         })
   }, [])

   const changeEditHandler = event => {
      setEditForm({ ...editForm, [event.target.name]: event.target.value })
   }

   const [file, setFile] = React.useState(null)

   const editHandler = async (e) => {
      e.preventDefault()

      const updatedProfile = { ...editForm }

      if (file) {
         const data = new FormData()
         const fileName = Date.now() + file.name
         updatedProfile.profilePicture = fileName
         data.append("name", fileName)
         data.append("file", file)
         try {
            await axios.post("/api/upload", data)
         } catch (err) { }
      }

      try {
         const data = await request(`/api/users/${auth.userId}`, 'PUT', updatedProfile, { token: `Bearer ${auth.token}` })
         auth.update(auth.userId, auth.token, data.fullName, data.email, data.phoneNumber, data.profilePicture)
         setEditActive(false)
      } catch (error) { }
   }

   return (
     <>
         {
            !isLoading ?
            <>
               <main className="profile-comp">
                  <div className="profile-comp--image">
                     <img src={auth.userPicture ? PF + auth.userPicture : userImg} alt="User" />
                        <button className="edit-profile-btn" onClick={() => { setEditActive(true) }}>
                           <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                        </button>
                  </div>
                  <Modal active={editActive} setActive={setEditActive}>
                     <h2 className="title">Редактировать</h2>
                     <form onSubmit={editHandler}>
                        <CustomInput
                           name='email'
                           label='Почта'
                           type='email'
                           value={auth.userEmail}
                           handleChange={changeEditHandler}
                        />
                        <CustomInput
                           name='fullName'
                           label='Имя'
                           type='text'
                           value={auth.userName}
                           handleChange={changeEditHandler}
                        />
                        <CustomInput
                           name='phoneNumber'
                           label='Телефон'
                           type='phone'
                           value={auth.userPhone}
                           handleChange={changeEditHandler}
                        />
                        <input
                           type="file"
                           id="file"
                           accept=".png,.jpeg,.jpg"
                           onChange={(e) => setFile(e.target.files[0])}
                        />
                        <input type="submit" className="submit-btn" value="Выполнить" />
                        {error && <h4 className='error'>{error}</h4>}
                     </form>
                  </Modal>
                  <article className="profile-comp--info">
                     <h3 className="name">{auth.userName}</h3>
                     <h3 className="phone"><FontAwesomeIcon icon={faPhone} className="icon" /> {auth.userPhone}</h3>
                     <h3 className="email"><FontAwesomeIcon icon={faEnvelope} className="icon" /> {auth.userEmail}</h3>
                  </article>
                  <nav className="profile-comp--btns">
                     <Link to={process.env.PUBLIC_URL + '/property'} className="profile-btn">
                        <FontAwesomeIcon icon={faBuilding} className="icon" />
                        <span className="text">недвижимость</span>
                     </Link>
                     <Link to={process.env.PUBLIC_URL + '/chats'} className="profile-btn">
                        <FontAwesomeIcon icon={faComments} className="icon" />
                        <span className="text">чаты</span>
                     </Link>
                     <Link to={process.env.PUBLIC_URL + '/favourites'} className="profile-btn">
                        <FontAwesomeIcon icon={faHeart} className="icon" />
                        <span className="text">избранное</span>
                     </Link>
                     {
                        home &&
                        <Link to={process.env.PUBLIC_URL + `/apartment/${home._id}`} className="profile-btn">
                           <FontAwesomeIcon icon={faHouseChimney} className="icon" />
                           <span className="text">мое жилье</span>
                        </Link>
                     }
                  </nav>
               </main>
            </> :
            <Loading />
         }
      </>
   )
}