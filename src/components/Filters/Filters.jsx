import React from "react";
import './Filters.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faBuilding, faStairs, faSliders } from '@fortawesome/free-solid-svg-icons'

export default function Filters() {

   const [showSortBy, setShowSortBy] = React.useState(false)
   const [sortBy, setSortBy] = React.useState('Price')

   const toggleShowSortBy = () => setShowSortBy(!showSortBy)

   // * Detects menu-list component (ref={ref})
   const ref = React.useRef(null);

   // * Detects click outside menu component
   React.useEffect(() => {
      const checkIfClickedOutside = e => {
         if (showSortBy && ref.current && !ref.current.contains(e.target)) {
            toggleShowSortBy()
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [showSortBy])

   return (
      <div className="filters">
         <article className="filters--article">
            <h1 className="title">Apartaments in <span>New-York</span></h1>
            <p className="result-num">1248 results</p>
         </article>
         <div className="filters--roommates">
            <label htmlFor="toggle-button">Roommates</label>
            <input type="checkbox" id="toggle-button" className="toggle-button" defaultChecked/>
         </div>
         <div className="filters--buttons">
            <button className="button price"><FontAwesomeIcon icon={faTag} className="icon" />Price</button>
            <button className="button apartament"><FontAwesomeIcon icon={faBuilding} className="icon" />Apartament</button>
            <button className="button floor"><FontAwesomeIcon icon={faStairs} className="icon" />Floor</button>
            <button className="button more"><FontAwesomeIcon icon={faSliders} className="icon" />More</button>
         </div>
         <label ref={ref} className="filters--sort-by" data-visible={showSortBy} onClick={toggleShowSortBy}>Sort by: <span>{sortBy}</span>
            <ul>
               {sortBy !== 'Price' && <li onClick={() => {setSortBy('Price'); toggleShowSortBy()}}>Price</li>}
               {sortBy !== 'Date' && <li onClick={() => {setSortBy('Date'); toggleShowSortBy()}}>Date</li>}
               {sortBy !== 'Area' && <li onClick={() => {setSortBy('Area'); toggleShowSortBy()}}>Area</li>}
            </ul>
         </label>
      </div>
   )
}