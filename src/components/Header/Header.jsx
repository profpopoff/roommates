import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserMenu from '../UserMenu/UserMenu'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import './Header.scss'
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faComments, faHeart } from '@fortawesome/free-regular-svg-icons'

export default function Header() {

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
               <li className="header__item--language">
                  <LanguageSelect />
               </li>
            </nav>
         </div>
      </header>
   )
}