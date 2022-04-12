import React from "react"
import { Link } from 'react-router-dom'
import './ProfileComp.scss'
import userImg from '../../assets/cover.jpeg'
import { AuthContex } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faPenToSquare, faComments, faHeart, faBuilding } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal/Modal"
import CustomInput from "../CustomInput/CustomInput"

export default function Profile() {

   const auth = React.useContext(AuthContex)

   const {loading, request, error} = useHttp()

   const [editActive, setEditActive] = React.useState(false)

   const [editForm, setEditForm] = React.useState({})

   const changeEditHandler = event => {
      setEditForm({...editForm, [event.target.name]: event.target.value})
   }

   const editHandler = async () => {
      try {
         const data = await request(`/api/users/${auth.userId}`, 'PUT', {...editForm}, {token: `Bearer ${auth.token}`})
         auth.update(data.fullName, data.email, data.phoneNumber)
         setEditActive(false)
      } catch (error) {}
   }

   return (
      <main className="profile-comp">
         <div className="profile-comp--image">
            <img src={userImg} alt="User" />
         </div>
         <article className="profile-comp--info">
            <h3 className="name">{auth.userName}</h3>
            <h3 className="phone"><FontAwesomeIcon icon={faPhone} className="icon" /> {auth.userPhone}</h3>
            <h3 className="email"><FontAwesomeIcon icon={faEnvelope} className="icon" /> {auth.userEmail}</h3>
         </article>
         <nav className="profile-comp--btns">
            <Modal active = {editActive} setActive={setEditActive}>
               <h2 className="title">Редактировать</h2>
               <form action="/">
                  <CustomInput 
                     name='email'
                     label='Почта'
                     type='email'
                     value={auth.userEmail}
                     handleChange={changeEditHandler}
                  />
                  {/* <CustomInput 
                     name='password'
                     label='Password'
                     type='password'
                     value={1234}
                     handleChange={changeEditHandler}
                  /> */}
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
                  <button className="submit-btn" onClick={editHandler} disabled={loading}>Выполнить</button>
                  {error && <h4 className='error'>{error}</h4>}
               </form>
            </Modal>
            <span className="profile-btn" onClick={() => {setEditActive(true)}}>
               <FontAwesomeIcon icon={faPenToSquare} className="icon" />
               <span className="text">редактировать</span>
            </span>
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
            
         </nav>
      </main>
   )
}