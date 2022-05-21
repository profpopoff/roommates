import React from "react";
import './Posts.scss'
import Post from '../Post/Post'
import ScrollBar from "../ScrollBar/ScrollBar"

export default function Posts(props) {

   const [priceFilters, setPriceFilters] = React.useState([])

   console.log(props.sortBy)

   React.useEffect(() => {
      setPriceFilters([props.minPrice, props.maxPrice])
   }, [props.new])

   function compareValues(key, order='desc') {
      return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
    
        const varA = (typeof a[key] === 'string') ? 
          a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string') ? 
          b[key].toUpperCase() : b[key]
    
        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order == 'desc') ? (comparison * -1) : comparison
        )
      }
   }

   const postElements = props.data.slice().sort(compareValues(props.sortBy[0], props.sortBy[1])).map(apartment => (
      props.roommates ?
      apartment.roommates[0] && apartment.amount <= priceFilters[1] && apartment.amount >= priceFilters[0] && 
         <Post 
            key={apartment._id}
            {...apartment}
         />
         : 
         apartment.amount <= priceFilters[1] && apartment.amount >= priceFilters[0] && 
         <Post 
            key={apartment._id}
            {...apartment}
         />
   ))
   
   return (
      <div className="posts">
         {/* <ScrollBar> */}
            {postElements}
         {/* </ScrollBar> */}
      </div>
   )
}