import React from "react"
import { useLocation } from 'react-router-dom'
import ApartmentInfo from '../components/ApartmentInfo/ApartmentInfo'
import Reviews from '../components/Reviews/Reviews'
import Loading from "../components/Loading/Loading"

export default function Apartment() {

   const id = useLocation().pathname.split(`${process.env.PUBLIC_URL}/`)[2]

   const [apartment, setApartment] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   React.useEffect(() => {
      setIsLoading(true)
      fetch(`/api/apartments/find/${id}`)
         .then((response) => response.json())
         .then((data) => {
            setApartment(data)
            setIsLoading(false)
         });

      // const response = await fetch(`/api/apartments/find/${id}`)
      // const data = await response.json()
      // setApartment(data)
     }, []);

   return (
      <main className="container--apartment">
         {
            !isLoading ?
            <>
               <ApartmentInfo {...apartment} />
               <Reviews reviews={apartment.reviews} roommates={apartment.roommates} />
            </> 
            :
            <Loading />
         }
      </main>
   )
}