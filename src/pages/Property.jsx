import React from "react"
import PropertyComp from "../components/PropertyComp/PropertyComp"
import Loading from "../components/Loading/Loading"
import { AuthContex } from "../context/AuthContext"

export default function CreateApartment() {

   const auth = React.useContext(AuthContex)

   const [apartments, setApartments] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   React.useEffect(() => {
      fetch(`/api/apartments/`)
         .then((response) => response.json())
         .then((data) => { 
            data.map(apartment => {
               apartment.landlordId === auth.userId && setApartments(prevApartments => [...prevApartments, apartment])
            })
            setIsLoading(false)
         });
     }, []);

   return (
      <main className="container">
         {
            !isLoading ?
            <>
               <PropertyComp data={apartments} />
            </>
            :
            <Loading />
         }
         
      </main>
   )
}