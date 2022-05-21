import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Post.scss'
import StarRatings from 'react-star-ratings'
import image from '../../assets/test.jpg'
import RoommatePicture from "../RoommatePicture/RoommatePicture"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

export default function Post(props) {

   const [isFavourite, setIsFavourite] = React.useState(false)

   const PF = process.env.REACT_APP_PUBLIC_FOLDER

   const toggleIsFavourite = () => setIsFavourite(!isFavourite)

   const conveniencesElement = props.conveniences.slice(0, 6).map((convenience, index) => (
      <li key={index}>{convenience}</li>
   ))

   const ratings = [] 
   props.reviews && props.reviews.map(review => ratings.push(review.rating))
   const average = (nums) =>{
      if (nums[0]) {
         return nums.reduce((a, b) => (a + b)) / nums.length
      } 
      return 0
   }

   // const [roommate, setRoommate] = React.useState()

   // React.useEffect(() => {
   //    const getUser = async (rm) => {
   //       try {
   //          const res = await axios.get('api/users/find/' + rm)
   //          setRoommate(prevRoommate => [...prevRoommate, res.data])
   //       } catch (error) {
   //          console.log(error)
   //       }
   //    } 
         
   //    if (props.roommates[0]) {
   //       props.roommates.map(rm => {getUser(rm)})
   //    } 
   // }, [])

   // console.log(roommate)


   const roommatesElements = props.roommates?.map(roommate => (
      props.roommates[0] && <RoommatePicture key={roommate} userId={roommate} /> 
   ))

   return (
      <div className="post">
         {/* {roommatesElements} */}
         
         <Link to={process.env.PUBLIC_URL + `/apartment/${props._id}`} className={`image ${props.roommates[0] && 'withRm'}`}>
            <picture>
               <img src={PF + props.images[0]} alt="image" />
            </picture>
            {/* {roommatesElements} */}
            {
               props.roommates[0] && 
               <h4 className="roommates">
                  <div className="imgs">
                     {roommatesElements} 
                  </div>
                  {props.roommates?.length} сосед{props.roommates?.length > 1 ? props.roommates?.length > 4 ? 'ей' : 'а' : ''}
               </h4>
            }
         </Link>
         <article className="post--article">
            <h2 className="title"><Link to={process.env.PUBLIC_URL + `/apartment/${props._id}`}>{props.title}</Link></h2>
            <h3 className="address">
               <FontAwesomeIcon icon={faLocationDot} className="icon" /> {props.city}, {props.street}, д.{props.houseNum}, кв.{props.apartmentNum}
            </h3>
         </article>
         <button className="add-to-favourites" onClick={toggleIsFavourite}>
            {isFavourite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
         </button>
         <ul className="conveniences">
            {conveniencesElement}
         </ul>
         {
            ratings[0] ? 
            <div className="rating">
               <span className="rating--num">{average(ratings).toString().substring(0,3)}</span>
               <StarRatings
                  rating={average(ratings)}
                  starRatedColor="blue"
                  starDimension="20"
                  starSpacing="2"
                  starHoverColor="blue"
                  name='rating'/>
            </div> 
            :
            <div className="rating">Оценок пока нет</div>
         }
         <div className="price"><span>{props.currency}{props.amount}</span>/{props.per}</div>
      </div>
            
   )
}