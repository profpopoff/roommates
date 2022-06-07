import React from "react"
import './Reviews.scss'
import StarRatings from 'react-star-ratings'
import { AuthContex } from '../../context/AuthContext'

export default function Reviews(props) {

   const auth = React.useContext(AuthContex)

   const reviewsElement = props.reviews.map(review => (
      <div className="review" key={review._id}>
         <h2>{review.userId}</h2>
         <div className="rating">
            <h3 className="num">{review.rating}</h3>
            <StarRatings
               rating={review.rating}
               starRatedColor="blue"
               starDimension="20"
               starSpacing="5"
               starHoverColor="blue"
               name='rating'
            />
         </div>
         <h3>{review.review}</h3>
      </div>
   ))

   console.log(props.roommates, auth.userId)

   return (
      <div className="reviews">
         {
            props.roommates?.includes(auth.userId) && 
            <button className="review-btn">Оставить отзыв</button>
         }
         {reviewsElement}
      </div>
   )
}