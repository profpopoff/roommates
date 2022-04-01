import React from "react"
import ApartmentInfo from '../components/ApartmentInfo/ApartmentInfo'
import Reviews from '../components/Reviews/Reviews'

export default function Apartment() {
   return (
      <main className="container--apartment">
         <ApartmentInfo />
         <Reviews />
      </main>
   )
}