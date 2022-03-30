import React from "react"
import Filters from '../components/Filters/Filters'
import Posts from "../components/Posts/Posts"

export default function Homepage() {
   return (
      <main className="container--home">
         <Filters className="filters" />
         <Posts className="posts" />
         <div className="map">map</div>
      </main>
   )
}