import React from "react"
import './ApartmentInfo.scss'
import StarRatings from 'react-star-ratings'
import image from '../../assets/test.jpg'
import roommate from '../../assets/roommate1.png'
import landlord from '../../assets/landlord.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faComments } from '@fortawesome/free-regular-svg-icons'


export default function ApartmentInfo(props) {

   // console.log(props)

   // const { amount, currency, per } = props.price

   const [isFavourite, setIsFavourite] = React.useState(false)

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)

   return (
      <div className="apartment-info">
         <div className="apartment-info--images">
            <picture className="image image-1 active">
               <img src={image} alt="appimage" />
            </picture>
            <picture className="image image-2">
               <img src={image} alt="appimage" />
            </picture>
            <picture className="image image-3">
               <img src={image} alt="appimage" />
            </picture>
            <picture className="image image-4">
               <img src={image} alt="appimage" />
            </picture>
            <picture className="image image-5">
               <img src={image} alt="image" />
            </picture>
            {/* <picture className="image image-6">
               <img src={image} alt="appimage" />
            </picture> */}
         </div>
         <article className="apartment-info--article">
            <h1 className="title">{props.title}</h1>
            <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" /> {props.address}</a></h3>
            {/* <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" /> asd</a></h3> */}
            <h2 className="price"><span>{props.currency}{props.amount}</span> /{props.per}</h2>
         </article>
         <div className="apartment-info--landlord">
            <div className="who">
               <h3 className="role">Арендатор</h3>
               <h2 className="name">John</h2>
               <a href="tel: +7950-220-9953" className="phone-number">+7(800)555-35-35</a>
            </div>
            <div className="img-block">
               <picture className="landlord-photo">
               <img src={landlord} alt="landlord image" />
            </picture>
            <a href="#" className="chat-link"><FontAwesomeIcon icon={faComments} className="icon" /><span className="sr-only">Начать чат с арендатором</span></a>
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
            {/* {conveniencesElement} */}
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