import React from "react";
import { Link } from 'react-router-dom'
import './Post.scss'
import StarRatings from 'react-star-ratings';
import image from '../../assets/test.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

export default function Post(props) {

   const [isFavourite, setIsFavourite] = React.useState(false)

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)


   const conveniencesElement = props.conveniences.map((convenience, index) => (
      <li key={index}>{convenience}</li>
   ))

   const ratings = [] 
   props.reviews.map(review => ratings.push(review.rating))
   function average(nums) {
      return nums.reduce((a, b) => (a + b)) / nums.length;
  }

   return (
      <div className="post">
         <Link to={process.env.PUBLIC_URL + '/apartment'} className="image">
            <picture>
               <img src={image} alt="image" />
            </picture>
         </Link>
         <article className="post--article">
            <h2 className="title"><Link to={process.env.PUBLIC_URL + '/apartment'}>{props.title}</Link></h2>
            <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" />{props.position.address}</a></h3>
         </article>
         <button className="add-to-favourites" onClick={toggleIsFavourite}>
            {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
         </button>
         <ul className="conveniences">
            {conveniencesElement}
         </ul>
         <div className="rating">
            <span className="rating--num">{average(ratings)}</span>
            <StarRatings
               rating={average(ratings)}
               starRatedColor="blue"
               starDimension="20"
               starSpacing="2"
               starHoverColor="blue"
               name='rating'/>
         </div>
         <div className="price"><span>{props.price.currency}{props.price.amount}</span>/{props.price.per}</div>
      </div>
            
   )
}