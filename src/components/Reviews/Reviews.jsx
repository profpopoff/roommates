import React from "react"
import './Reviews.scss'
import StarRatings from 'react-star-ratings'

export default function Reviews(props) {

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

   return (
      <div className="reviews">
         {reviewsElement}
      </div>
   )
}