import React from "react"
import Filters from '../components/Filters/Filters'
import Post from '../components/Post/Post'
import ScrollBar from "../components/ScrollBar/ScrollBar"
import Map from '../components/Map.jsx/Map'

export default function Homepage() {

   const apartments = require('../assets/data.json').apartments;

   const postElements = apartments.map(apartment => (
      <Post 
         key={apartment.id}
         {...apartment}
      />
   ))

   return (
      <main className="container--home">
         <Filters />
         {/* <Posts data={...apartments} /> */}
         <div className="posts">
            <ScrollBar>
               {postElements}
            </ScrollBar>
         </div>
         <Map />
      </main>
   )
}