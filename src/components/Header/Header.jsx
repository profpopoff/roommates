import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserMenu from '../UserMenu/UserMenu'
import Modal from '../Modal/Modal'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import './Header.scss'
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faComments, faHeart } from '@fortawesome/free-regular-svg-icons'
import CustomInput from '../CustomInput/CustomInput'

export default function Header() {

   const [loginActive, setLoginActive] = React.useState(false)

   const [form, setForm] = React.useState({
      email: '', password: ''
   })

   const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
   }

   console.log(form)

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
            <form action="/" className="search-form"> 
               <input type="text" placeholder="Search" className="search-input" />
               <button className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" /><span className="sr-only">Search</span></button>
            </form>
            <nav className="primary-navigation">
                  <li>
                     <NavLink to={process.env.PUBLIC_URL + '/chats'} className="primary-navigation--link chats-link">
                        <FontAwesomeIcon icon={faComments} className="icon" />
                        <span className="sr-only">Chats</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to={process.env.PUBLIC_URL + '/favourites'} className="primary-navigation--link favourites-link">
                     <FontAwesomeIcon icon={faHeart} />
                        <span className="sr-only">Favourites</span>
                     </NavLink>
                  </li>
                  <li>
                     <UserMenu />
                  </li>
                  <li className="header__item--log-in">
                     <button className='log-in-btn' onClick={() => {setLoginActive(true)}}>Log In</button>
                     <Modal active = {loginActive} setActive={setLoginActive}>
                        <h2 className="title">Log In</h2>
                        <form action="/">
                           <CustomInput 
                              name='email'
                              label='Email'
                              type='email'
                              handleChange={changeHandler}
                           />
                           <CustomInput 
                              name='password'
                              label='Password'
                              type='password'
                              handleChange={changeHandler}
                           />
                           <input className='submit-btn' type="submit" value='Submit'/>
                        </form>
                     </Modal>
                  </li>
                  <li className="header__item--sign-up">
                     <NavLink to={process.env.PUBLIC_URL + '/register'} className="primary-navigation--link sign-up-btn">
                        Sign Up
                     </NavLink>
                  </li>

               <li className="header__item--language">
                  <LanguageSelect />
               </li>
            </nav>
         </div>
      </header>
   )
}