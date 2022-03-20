import React from "react"
import Filters from '../components/Filters/Filters'

export default function Homepage() {
   return (
      <main className="container--home">
         <Filters className="filters" />
         <div className="posts">posts</div>
         <div className="map">map</div>
      </main>
   )
}