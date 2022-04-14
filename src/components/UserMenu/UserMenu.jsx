import React from "react"
import axios from "axios"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userImg from '../../assets/default-user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faCircleInfo, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import './UserMenu.scss'
import { AuthContex } from '../../context/AuthContext'
import Modal from "../Modal/Modal"
import CustomToggle from "../CustomToggle/CustomToggle"

export default function UserMenu() {

   const auth = React.useContext(AuthContex)

   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   
   const [settingsActive, setSettingsActive] = React.useState(false)

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

   const logoutHandler = event  => {
      event.preventDefault()
      auth.logout()
   }

   const navigate = useNavigate();

   const createConverstion = async () => {
      try {
         const res = await axios.post('/api/conversations', {senderId: auth.userId, receiverId: '62584757fe8b86daa4da4e2f'})
         navigate("/chats");
      } catch (error) {
         console.log(error)
      }
   }

   // * User menu rendering
   return (
      <div ref={ref} className="user-menu">
         <div className="user-button" onClick={toggleMenu}>
            <h3 className="user-button--name">{auth.userName}</h3>
            <div className="user-button--image">
               <img src={auth.userPicture ? PF + auth.userPicture : userImg} alt="User image" />
            </div>
         </div>
         <ul className="user-menu--list" data-visible={showMenu}>
            <li>
               <NavLink to={process.env.PUBLIC_URL + '/profile'} className="user-menu--link" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faUser} className="menu-icon" />Профиль
               </NavLink>
            </li>
            <li>
               <button className='user-menu--link' onClick={() => {setSettingsActive(true)}}><FontAwesomeIcon icon={faGear} className="menu-icon" />Настройки</button>
            </li>
            <li>
               {/* <NavLink to={process.env.PUBLIC_URL + '/help'} className="user-menu--link" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faCircleInfo} className="menu-icon" />Помошь
               </NavLink> */}
               <button className='user-menu--link' onClick={createConverstion}><FontAwesomeIcon icon={faCircleInfo} className="menu-icon" />Помошь</button>
            </li>
            <li onClick={logoutHandler}>
               <Link to={process.env.PUBLIC_URL + '/'} className="user-menu--link" >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="menu-icon" />Выйти
               </Link>
            </li>
         </ul>
         <Modal active = {settingsActive} setActive={setSettingsActive}>
            <h2 className="title"><FontAwesomeIcon icon={faGear} className="menu-icon" /> Настройки</h2>
            <div className="theme">
               <CustomToggle label="Темная тема" name="theme"/>
            </div>
         </Modal>
      </div>
   )
}