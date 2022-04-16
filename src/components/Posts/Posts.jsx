import React from "react";
import './Posts.scss'
import Post from '../Post/Post'
import ScrollBar from "../ScrollBar/ScrollBar"

export default function Posts(props) {

   const postElements = props.data.slice(0).reverse().map(apartment => (
      <Post 
         key={apartment._id}
         {...apartment}
      />
   ))

   return (
      <div className="posts">
         <ScrollBar>
            {postElements}
         </ScrollBar>
      </div>
   )
}