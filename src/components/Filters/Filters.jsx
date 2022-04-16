import React from "react";
import './Filters.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faBuilding, faStairs, faSliders } from '@fortawesome/free-solid-svg-icons'
import CustomToggle from "../CustomToggle/CustomToggle";

export default function Filters(props) {

   const [showSortBy, setShowSortBy] = React.useState(false)
   const [sortBy, setSortBy] = React.useState('Дате')

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
            <h1 className="title">Квартиры в <span>Санкт-Петербурге</span></h1>
            <p className="result-num">{props.data.length} результатов</p>
         </article>
         <div className="filters--roommates">
            <CustomToggle label="Соседи" name="roommates" checked={true} />
         </div>
         <div className="filters--buttons">
            <button className="button price"><FontAwesomeIcon icon={faTag} className="icon" />Цена</button>
            <button className="button apartament"><FontAwesomeIcon icon={faBuilding} className="icon" />Тип</button>
            <button className="button floor"><FontAwesomeIcon icon={faStairs} className="icon" />Этаж</button>
            <button className="button more"><FontAwesomeIcon icon={faSliders} className="icon" />Другое</button>
         </div>
         <label ref={ref} className="filters--sort-by" data-visible={showSortBy} onClick={toggleShowSortBy}>Сортировать по: <span>{sortBy}</span>
            <ul>
               {sortBy !== 'Цене' && <li onClick={() => {setSortBy('Цене'); toggleShowSortBy()}}>Цене</li>}
               {sortBy !== 'Отзывам' && <li onClick={() => {setSortBy('Отзывам'); toggleShowSortBy()}}>Отзывам</li>}
               {sortBy !== 'Дате' && <li onClick={() => {setSortBy('Дате'); toggleShowSortBy()}}>Дате</li>}
               {sortBy !== 'Площади' && <li onClick={() => {setSortBy('Площади'); toggleShowSortBy()}}>Площади</li>}
            </ul>
         </label>
      </div>
   )
}