import React from "react"
import './ApartmentInfo.scss'
import StarRatings from 'react-star-ratings'
import image from '../../assets/test.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular, faComments } from '@fortawesome/free-regular-svg-icons'


export default function ApartmentInfo() {

   const [isFavourite, setIsFavourite] = React.useState(false)

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)


   const conveniences = ['Wifi', 'Air conditioning', 'Kitchen']
   const conveniencesElement = conveniences.map((convenience, index) => (
      <li key={index}>{convenience}</li>
   ))


   
   const rating = 2.45

   return (
      <div className="apartment-info">
         <div className="apartment-info--images">
            <picture className="main-image">
               <img src={image} alt="image" />
            </picture>
            <picture className="image">
               <img src={image} alt="image" />
            </picture>
            <picture className="image">
               <img src={image} alt="image" />
            </picture>
            <picture className="image">
               <img src={image} alt="image" />
            </picture>
            <picture className="image">
               <img src={image} alt="image" />
            </picture>
         </div>
         <article className="post--article">
            <h2 className="title">The People's Brownstone</h2>
            <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" />1995 Broadway, New York</a></h3>
         </article>
         <div className="apartment-info--landlord">
            <h3 className="role">landlord</h3>
            <h2 className="name">John</h2>
            <picture className="landlord-photo">
               <img src="#" alt="landlord image" />
            </picture>
            <a href="#" className="chat-link"><FontAwesomeIcon icon={faComments} className="icon" /></a>
            <a href="tel: +7800-555-3535" className="phone-number"><FontAwesomeIcon icon={faPhone} />+7 (800) 555-35-35</a>
         </div>
         <div className="apartment-info--roommates">
            <picture className="roommate-photo">
               <img src="#" alt="roommate photo" />
            </picture>
            <picture className="roommate-photo">
               <img src="#" alt="roommate photo" />
            </picture>
            <picture className="roommate-photo">
               <img src="#" alt="roommate photo" />
            </picture>
            <h3 className="roommates-number">3 roommates</h3>
            <span className="roommates-names">Roni, Alex and Mike</span>
         </div>
         <div className="apartment-info--add-to-favourites">
            Add to favourites:
            <button className="atf-btn" onClick={toggleIsFavourite}>
               {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
            </button>
         </div>
         <div className="apartment-info--price">
            <h2><span>$3,000</span>/month</h2>
            <StarRatings
            className="rating"
            rating={rating}
            starRatedColor="blue"
            starDimension="1.25rem"
            starSpacing="2px"
            starHoverColor="blue"
            name='rating'/>
         </div> 
         <ul className="apartment-info--conveniences">
            {conveniencesElement}
         </ul>
         <div className="apartment-info--stats">
            <div className="floor">
               <h3 className="stat">floor</h3>
               <h2 className="value">3</h2>
            </div>
            <div className="area">
               <h3 className="stat">area</h3>
               <h2 className="value">50&#13217;</h2>
            </div>
            <div className="rooms">
               <h3 className="stat">rooms</h3>
               <h2 className="value">4</h2>
            </div>
         </div>
         <p className="apartment-info--desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
   )
}