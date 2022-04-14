import React from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './ApartmentInfo.scss'
import image from '../../assets/test.jpg'
import roommate from '../../assets/roommate1.png'
import userImg from '../../assets/default-user.png'
import { AuthContex } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid, faPhone, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faComments } from '@fortawesome/free-regular-svg-icons'


export default function ApartmentInfo(props) {

   const auth = React.useContext(AuthContex)

   const navigate = useNavigate();

   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   const [landlordData, setLandlordData] = React.useState()

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

   return (
      <div className="apartment-info">
         <div className="apartment-info--images">
            {/* {imageElements} */}
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
            <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" /> {props.address}</a></h3>
            <h2 className="price"><span>{props.currency}{props.amount}</span> /{props.per}</h2>
         </article>
         <div className="apartment-info--landlord">
            <div className="who">
               <h3 className="role">Арендодатель</h3>
               <a href="tel: +7950-220-9953" className="phone-number">{landlordData?.phoneNumber}</a>
               <h2 className="name">{landlordData?.fullName}</h2>
            </div>
            <div className="img-block">
               <picture className="landlord-photo">
               <img src={landlordData?.profilePicture ? PF + landlordData.profilePicture : userImg} alt="landlord image" />
            </picture>
            <button 
               className="chat-link" 
               onClick={createConverstion}
               >
                  <FontAwesomeIcon icon={faComments} className="icon" />
                  <span className="sr-only">Начать чат с арендатором</span>
            </button>
            </div>
            
            
         </div>
         <div className="apartment-info--roommates">
            <div className="photos">
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
            <span className="roommates-names">Roni, Alex and Mike</span>
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
         <p className="apartment-info--desc">{props.desc}</p>
      </div>
   )
}