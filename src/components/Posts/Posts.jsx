import React from "react";
import { Link } from 'react-router-dom'
import './Posts.scss'
import StarRatings from 'react-star-ratings';
import image from '../../assets/test.jpg'
import ScrollBar from '../ScrollBar/ScrollBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

export default function Posts() {

   const [isFavourite, setIsFavourite] = React.useState(false)

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)


   const conveniences = ['Wifi', 'Air conditioning', 'Kitchen']
   const conveniencesElement = conveniences.map(convenience => (
      <li>{convenience}</li>
   ))

   const [rating, setRating] = React.useState(4)
   const changeRating = newRating => setRating(newRating)

   return (
      <div className="posts">
         <ScrollBar>
            <div className="post">
               <picture>
                  <img src={image} alt="image" />
               </picture>
               <article className="post--article">
                  <h2 className="title"><a href="#">The People's Brownstone</a></h2>
                  <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" />1995 Broadway, New York</a></h3>
               </article>
               <button className="add-to-favourites" onClick={toggleIsFavourite}>
                  {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
               </button>
               <ul className="conveniences">
                  {conveniencesElement}
               </ul>
               <div className="rating">
                  <span className="rating--num">{rating}</span>
                  <StarRatings
                     rating={rating}
                     starRatedColor="blue"
                     changeRating={changeRating}
                     numberOfStars={5}
                     starDimension={20}
                     starSpacing={2}
                     starHoverColor="blue"
                     name='rating'/>
               </div>
               <div className="price"><span>$3,000</span>/month</div>
            </div>
            <div className="post">
               <picture>
                  <img src={image} alt="image" />
               </picture>
               <article className="post--article">
                  <h2 className="title"><a href="#">The People's Brownstone</a></h2>
                  <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" />1995 Broadway, New York</a></h3>
               </article>
               <button className="add-to-favourites" onClick={toggleIsFavourite}>
                  {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
               </button>
               <ul className="conveniences">
                  {conveniencesElement}
               </ul>
               <div className="rating">
                  <span className="rating--num">{rating}</span>
                  <StarRatings
                     rating={rating}
                     starRatedColor="blue"
                     changeRating={changeRating}
                     numberOfStars={5}
                     starDimension={20}
                     starSpacing={2}
                     starHoverColor="blue"
                     name='rating'/>
               </div>
               <div className="price"><span>$3,000</span>/month</div>
            </div>
            <div className="post">
               <picture>
                  <img src={image} alt="image" />
               </picture>
               <article className="post--article">
                  <h2 className="title"><a href="#">The People's Brownstone</a></h2>
                  <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" />1995 Broadway, New York</a></h3>
               </article>
               <button className="add-to-favourites" onClick={toggleIsFavourite}>
                  {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
               </button>
               <ul className="conveniences">
                  {conveniencesElement}
               </ul>
               <div className="rating">
                  <span className="rating--num">{rating}</span>
                  <StarRatings
                     rating={rating}
                     starRatedColor="blue"
                     changeRating={changeRating}
                     numberOfStars={5}
                     starDimension={20}
                     starSpacing={2}
                     starHoverColor="blue"
                     name='rating'/>
               </div>
               <div className="price"><span>$3,000</span>/month</div>
            </div>
            <div className="post">
               <picture>
                  <img src={image} alt="image" />
               </picture>
               <article className="post--article">
                  <h2 className="title"><a href="#">The People's Brownstone</a></h2>
                  <h3 className="address"><a href="#"><FontAwesomeIcon icon={faLocationDot} className="icon" />1995 Broadway, New York</a></h3>
               </article>
               <button className="add-to-favourites" onClick={toggleIsFavourite}>
                  {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
               </button>
               <ul className="conveniences">
                  {conveniencesElement}
               </ul>
               <div className="rating">
                  <span className="rating--num">{rating}</span>
                  <StarRatings
                     rating={rating}
                     starRatedColor="blue"
                     changeRating={changeRating}
                     numberOfStars={5}
                     starDimension={20}
                     starSpacing={2}
                     starHoverColor="blue"
                     name='rating'/>
               </div>
               <div className="price"><span>$3,000</span>/month</div>
            </div>
         </ScrollBar>
      </div>
   )
}