import React from "react"
import Filters from '../components/Filters/Filters'
import Posts from '../components/Posts/Posts'
import Map from '../components/Map/Map'
import Loading from "../components/Loading/Loading"

import { AuthContex } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export default function Homepage() {

   // const auth = React.useContext(AuthContex)

   // const {loading, request, error} = useHttp()

   const [apartments, setApartments] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   React.useEffect(() => {
      fetch(`/api/apartments/`)
         .then((response) => response.json())
         .then((data) => {
            setApartments(data)
            setIsLoading(false)
         });
     }, []);

   // const positions = []
   // apartments?.map(apartment => positions.push(apartment.position))

   return (
      <main className="container--home">
         {
            !isLoading ?
            <>
               <Filters data={apartments} />
               <Posts data={apartments} />
               {/* <Map data={apartments} /> */}
            </>
            :
            <Loading />
         }
         
      </main>
   )
}