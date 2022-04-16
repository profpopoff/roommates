import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import UserMenu from '../UserMenu/UserMenu'
import Modal from '../Modal/Modal'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import './Header.scss'
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faComments, faHeart, faBuilding } from '@fortawesome/free-regular-svg-icons'
import CustomInput from '../CustomInput/CustomInput'
import { useHttp } from '../../hooks/http.hook'
import { AuthContex } from '../../context/AuthContext'

export default function Header() {

   const path = useLocation().pathname.split(`${process.env.PUBLIC_URL}/`)[1]
   const location = path === '' ? 'home' : path

   const auth = React.useContext(AuthContex)

   const [loginActive, setLoginActive] = React.useState(false)

   const {loading, request, error} = useHttp()

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

   // * Header rendering
   return (
      <header className="primary-header"> 
         <div className="primary-header--container">
            <Link to={process.env.PUBLIC_URL + '/'} className="logo">
               <div className="logo-image">
                  <img src={logo} alt="Roommates logo" />
               </div>
               <h2 className="logo-title">Room<span>mates</span></h2>
            </Link>

            {
               location === 'home' &&
               <form action="/" className="search-form"> 
                  <input type="text" placeholder="Поиск" className="search-input" />
                  <button className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" /><span className="sr-only">Search</span></button>
               </form>
            }
            {
               auth.isAuthenticated ? 
               <nav className="primary-navigation">
                  <li>
                     <NavLink to={process.env.PUBLIC_URL + '/property'} className="primary-navigation--link create-apartment-link">
                        <FontAwesomeIcon icon={faBuilding} className="icon" />
                        <span className="sr-only">Моя недвижимость</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to={process.env.PUBLIC_URL + '/chats'} className="primary-navigation--link chats-link">
                        <FontAwesomeIcon icon={faComments} className="icon" />
                        <span className="sr-only">Чаты</span>
                        {auth.notification && <span className="notification">!</span>}
                     </NavLink>
                     
                  </li>
                  <li>
                     <NavLink to={process.env.PUBLIC_URL + '/favourites'} className="primary-navigation--link favourites-link">
                     <FontAwesomeIcon icon={faHeart} />
                        <span className="sr-only">Избранное</span>
                     </NavLink>
                  </li>
                  <li>
                     <UserMenu />
                  </li>
                  
                  <li className="header__item--language">
                     <LanguageSelect />
                  </li>
               </nav>
               :
               <nav className="primary-navigation">
                  <li className="header__item--log-in">
                     <button className='log-in-btn' onClick={() => {setLoginActive(true)}}>Вход</button>
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
                  </li>
                  <li className="header__item--sign-up">
                     <NavLink to={process.env.PUBLIC_URL + '/register'} className="primary-navigation--link sign-up-btn">
                        Регистрация
                     </NavLink>
                  </li>
                  <li className="header__item--language">
                     <LanguageSelect />
                  </li>
               </nav> 
            }
         </div>
      </header>
   )
}