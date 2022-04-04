import React from "react";
import './Posts.scss'
import Post from '../Post/Post'
import ScrollBar from "../ScrollBar/ScrollBar"

export default function Posts(props) {

   const postElements = props.data.map(apartment => (
      <Post 
         key={apartment.id}
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