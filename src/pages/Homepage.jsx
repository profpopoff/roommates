import React from "react"
import Filters from '../components/Filters/Filters'
import Posts from '../components/Posts/Posts'
import Map from '../components/Map/Map'

export default function Homepage() {

   const apartments = require('../assets/data.json').apartments;

   const positions = []
   apartments.map(apartment => positions.push(apartment.position))

   return (
      <main className="container--home">
         <Filters />
         <Posts data={apartments} />
         {/* <Map positions={positions} /> */}
      </main>
   )
}