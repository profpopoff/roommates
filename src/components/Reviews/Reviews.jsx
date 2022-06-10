import React from "react"
import './Reviews.scss'
import StarRatings from 'react-star-ratings'
import Modal from "../Modal/Modal"
import CustomTextarea from "../CustomTextarea/CustomTextarea"
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

   const [reviewActive, setReviewActive] = React.useState(false)
   const [ratingNum, setRatingNum] = React.useState()
   const [finalReview, setFinalReview] = React.useState({isDone: false})


   const changeHandler = event => {
      setFinalReview({ ...finalReview, [event.target.name]: event.target.value })
   }

   return (
      <div className="reviews">
         {
            props.roommates?.includes(auth.userId) &&
            <>
               <button className="review-btn" onClick={() => { setReviewActive(true) }}>{finalReview.isDone ? 'Изменить отзыв' : 'Оставить отзыв'}</button>
               <Modal active={reviewActive} setActive={setReviewActive}>
                  <h2 className="title">Ваш отзыв</h2>
                  <div className="rating-change">
                     <h3 className="rating-change__title">Оценка</h3>
                     <StarRatings
                        rating={ratingNum}
                        changeRating={(newRating) => { setRatingNum(newRating); setFinalReview({ ...finalReview, rating: newRating }) }}
                        starRatedColor="blue"
                        starDimension="20"
                        starSpacing="5"
                        starHoverColor="blue"
                        name='rating'
                     />
                  </div>
                  <CustomTextarea label="Комментарий" name="review" handleChange={changeHandler} />
                  <button className="submit-btn" onClick={() => { setReviewActive(false); setFinalReview({ ...finalReview, isDone: true}) }}>Отправить</button>
               </Modal>
            </>
         }
         {
            finalReview.isDone && 
            <div className="review">
               <h2>{auth.userName.split(' ')[0]}</h2>
               <div className="rating">
                  <h3 className="num">{finalReview.rating}</h3>
                  <StarRatings
                     rating={finalReview.rating}
                     starRatedColor="blue"
                     starDimension="20"
                     starSpacing="5"
                     starHoverColor="blue"
                     name='rating'
                  />
               </div>
               <h3>{finalReview.review}</h3>
            </div>
         }
         {reviewsElement}
      </div>
   )
}