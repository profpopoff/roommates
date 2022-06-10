import React from "react"
import axios from 'axios'
import './Conversation.scss'
import userImg from '../../assets/default-user.png'
import { AuthContex } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faTrashCan, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Modal from "../Modal/Modal"
import CustomToggle from "../CustomToggle/CustomToggle"
import { useHttp } from "../../hooks/http.hook"

export default function Conversation(props) {

   const PF = process.env.REACT_APP_PUBLIC_FOLDER

   const {loading, request, error} = useHttp()

   const auth = React.useContext(AuthContex)

   const [notMe, setNotMe] = React.useState(null)

   React.useEffect(() => {
      const notMeId = props.conversation.members.find(member => member !== props.userId)

      const getUser = async () => {
         try {
            const res = await axios.get('api/users/find/' + notMeId)
            setNotMe(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      getUser()
   }, [props.userId, props.conversation])

   const [moreActive, setMoreActive] = React.useState(false)

   function refreshPage() {
      window.location.reload();
   }

   const deleteHandler = async (id) => {
      try {
         const res = await axios.delete('api/conversations/' + id)
         refreshPage()
      } catch (error) { }
   }

   const [apartments, setApartments] = React.useState([])
   // const [isLoading, setIsLoading] = React.useState(true)

   React.useEffect(() => {
      fetch(`/api/apartments/`)
         .then((response) => response.json())
         .then((data) => {
            data.map(apartment => {
               apartment.landlordId === auth.userId && setApartments(prevApartments => [...prevApartments, apartment])
            })
            // setIsLoading(false)
         });
   }, []);

   const [isHere, setIsHere] = React.useState()

   const setRoommate = async () => {
      try {
         const data = await request(`/api/apartments/${isHere._id}`, 'PUT', 
         {roommates: [...isHere.roommates, notMe._id]}, {token: `Bearer ${auth.token}`})
      } catch (error) {console.log(error)}
   }

   return (
      <div className="conversation">
         <img src={notMe?.profilePicture ? PF + notMe.profilePicture : userImg} alt="" className="conversation-img" onClick={props.onClick} />
         <span className="conversation-name" onClick={props.onClick}>{notMe?.fullName}</span>
         {auth.notification && <span className="notification">!</span>}
         <button className="conversation-menu" onClick={() => { setMoreActive(true) }}><FontAwesomeIcon icon={faEllipsis} className="icon" /></button>
         <Modal active={moreActive} setActive={setMoreActive}>
            <h2 className="title">{notMe?.fullName}</h2>
            {
               apartments &&
               <div className="aaaaaaaa-pomogite">
                  <h3 className="muzhuk-pochti-vsyo">Арендует:</h3>
                  {
                     apartments.map(apartment => (
                        <div key={apartment._id} className="davai-blyat-poterpi">
                           {/* {apartment.title} */}
                           <h4>
                              <FontAwesomeIcon icon={faLocationDot} className="icon" /> {apartment.city}, {apartment.street}, д.{apartment.houseNum}, кв.{apartment.apartmentNum}
                           </h4>
                           <CustomToggle
                              name="roommates"
                              disabled={isHere && isHere._id !== apartment._id}
                              isTrue={apartment.roommates.includes(notMe?._id)}
                              onChange={(e) => { e.target.checked ? setIsHere(apartment) : setIsHere() }}
                           />
                        </div>
                     ))
                  }
               </div>
            }

            <button
               className="delete-btn"
               onClick={e => {
                  e.preventDefault();
                  deleteHandler(props.conversation._id);
                  setMoreActive(false)
               }}
            >
               <FontAwesomeIcon icon={faTrashCan} className="icon" /> удалить собеседника
            </button>
            <button className="submit-btn" onClick={() => { setMoreActive(false); setRoommate() }}>Применить</button>
         </Modal>
      </div>
   )
}