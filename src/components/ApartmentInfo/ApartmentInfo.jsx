import React from "react"
import './ApartmentInfo.scss'
import StarRatings from 'react-star-ratings'
import image from '../../assets/test.jpg'
import roommate from '../../assets/roommate1.png'
import landlord from '../../assets/landlord.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faComments } from '@fortawesome/free-regular-svg-icons'


export default function ApartmentInfo() {

   const [isFavourite, setIsFavourite] = React.useState(false)

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)


   const conveniences = ['Wifi', 'Air conditioning', 'Kitchen', 'Air ', 'Cats are allowed', ' conditioning', 'parking', 'Air conditioning', 'Kitchen', 'Air conditioning', 'Kitchen', 'Air conditioning', 'Kitchen']
   const conveniencesElement = conveniences.map((convenience, index) => (
      <li key={index}>{convenience}</li>
   ))

   const rating = 2.45

   return (
      <div className="apartment-info">
         <div className="apartment-info--images">
            <picture className="image image-1 active">
               <img src={image} alt="image" />
            </picture>
            <picture className="image image-2">
               <img src={image} alt="image" />
            </picture>
            <picture className="image image-3">
               <img src={image} alt="image" />
            </picture>
            <picture className="image image-4">
               <img src={image} alt="image" />
            </picture>
            <picture className="image image-5">
               <img src={image} alt="image" />
            </picture>
            <picture className="image image-6">
               <img src={image} alt="image" />
            </picture>
         </div>
         <article className="apartment-info--article">
            <h1 className="title">The People's Brownstone</h1>
            <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" /> 1995 Broadway, New York</a></h3>
            <h2><span>$3,000 </span>/month</h2>
         </article>
         <div className="apartment-info--landlord">
            <div className="who">
               <h3 className="role">landlord</h3>
               <h2 className="name">John</h2>
               <a href="tel: +7950-220-9953" className="phone-number">+7(800)555-35-35</a>
            </div>
            <div className="img-block">
               <picture className="landlord-photo">
               <img src={landlord} alt="landlord image" />
            </picture>
            <a href="#" className="chat-link"><FontAwesomeIcon icon={faComments} className="icon" /><span className="sr-only">Start chatting with landlord</span></a>
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
            <h3 className="roommates-number">3 roommates</h3>
            <span className="roommates-names">Roni, Alex and Mike</span>
         </div>
            <button className="apartment-info--add-to-favourites" onClick={toggleIsFavourite}>
               {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
            </button>
         <ul className="apartment-info--conveniences">
            {conveniencesElement}
         </ul>
         <div className="apartment-info--stats">
            <div className="floor info">
               <h3 className="stat">floor</h3>
               <h2 className="value">3</h2>
            </div>
            <div className="area info">
               <h3 className="stat">area</h3>
               <h2 className="value">50&#13217;</h2>
            </div>
            <div className="rooms info">
               <h3 className="stat">rooms</h3>
               <h2 className="value">4</h2>
            </div>
         </div>
         <p className="apartment-info--desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
   )
}