import React from "react"
import { Link, NavLink } from 'react-router-dom'
import userImg from '../../assets/user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faGear, faCircleInfo, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './UserMenu.scss'

export default function UserMenu() {

   // * State that shows or hides user menu
   const [showMenu, setShowMenu] = React.useState(false)

   // * Function that toggles user menu state
   const toggleMenu = () => setShowMenu(!showMenu)

   // * Detects menu-list component (ref={ref})
   const ref = React.useRef(null);

   // * Detects click outside menu component
   React.useEffect(() => {
      const checkIfClickedOutside = e => {
         if (showMenu && ref.current && !ref.current.contains(e.target)) {
            toggleMenu()
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [showMenu])

   // * User menu rendering
   return (
      <div ref={ref} className="user-menu">
         <div className="user-button" onClick={toggleMenu}>
            <h3 className="user-button--name">Richard Lucas</h3>
            <div className="user-button--image">
               <img src={userImg} alt="User image" />
            </div>
         </div>
         <ul className="user-menu--list" data-visible={showMenu}>
            <li><NavLink to={process.env.PUBLIC_URL + '/profile'} className="user-menu--link" onClick={toggleMenu}>
               <FontAwesomeIcon icon={faUser} className="menu-icon" />My profile</NavLink>
            </li>
            <li><NavLink to={process.env.PUBLIC_URL + '/profile/edit'} className="user-menu--link" onClick={toggleMenu}>
               <FontAwesomeIcon icon={faPenToSquare} className="menu-icon" />Edit profile</NavLink>
            </li>
            <li><NavLink to={process.env.PUBLIC_URL + '/settings'} className="user-menu--link" onClick={toggleMenu}>
               <FontAwesomeIcon icon={faGear} className="menu-icon" />Settings</NavLink>
            </li>
            <li><NavLink to={process.env.PUBLIC_URL + '/help'} className="user-menu--link" onClick={toggleMenu}>
               <FontAwesomeIcon icon={faCircleInfo} className="menu-icon" />Help</NavLink>
            </li>
            <li><Link to={process.env.PUBLIC_URL + '/'} className="user-menu--link" onClick={toggleMenu}>
               <FontAwesomeIcon icon={faArrowRightFromBracket} className="menu-icon" />Logout</Link>
            </li>
         </ul>
      </div>
   )
}