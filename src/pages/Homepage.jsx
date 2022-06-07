import React from "react"
import Filters from '../components/Filters/Filters'
import Posts from '../components/Posts/Posts'
import Map from '../components/Map/Map'
import Loading from "../components/Loading/Loading"

import { AuthContex } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export default function Homepage() {

   const [apartments, setApartments] = React.useState([])
   const [isLoading, setIsLoading] = React.useState(true)

   const [priceMin, setPriceMin] = React.useState(0)
   const [priceMax, setPriceMax] = React.useState(1000000000)
   const [newFilters, setNewFilters] = React.useState(false)

   const [sortBy, setSortBy] = React.useState(['createdAt'])

   const [withRoommates, setWithRoommates] = React.useState(false)
   // const [isRoom, setIsRoom] = React.useState(false)
   const [isBed, setIsBed] = React.useState(true)
   
   const [types, setTypes] = React.useState([])
   
   React.useEffect(() => {
      fetch(`/api/apartments/`)
         .then((response) => response.json())
         .then((data) => {
            setApartments(data)
            setIsLoading(false)
         })
     }, [])

   return (
      <main className="container--home">
         {
            !isLoading ?
            <>
               <Filters 
                  data={apartments} 
                  minPrice={priceMin} 
                  maxPrice={priceMax} 
                  setMin={setPriceMin} 
                  setMax={setPriceMax} 
                  setFilters={setNewFilters} 
                  new={newFilters} 
                  roommates={withRoommates}
                  setRoommates={setWithRoommates}
                  types={types}
                  setTypes={setTypes}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
               />
               <Posts 
                  data={apartments} 
                  minPrice={priceMin} 
                  maxPrice={priceMax} 
                  new={newFilters} 
                  roommates={withRoommates}
                  types={types}
                  setTypes={setTypes}
                  sortBy={sortBy}
               />
               {/* <Map 
                   data={apartments} 
                  minPrice={priceMin} 
                  maxPrice={priceMax} 
                  new={newFilters} 
                  roommates={withRoommates}
                  types={types}
               /> */}
            </>
            :
            <Loading />
         }
      </main>
   )
}