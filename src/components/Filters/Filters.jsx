import React from "react"
import './Filters.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faBuilding, faStairs, faSliders, faArrowDownShortWide, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import CustomToggle from "../CustomToggle/CustomToggle"
import Modal from "../Modal/Modal"
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider"

export default function Filters(props) {

   const [showSortBy, setShowSortBy] = React.useState(false)

   const [priceActive, setPriceActive] = React.useState(false)

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
            <CustomToggle label="Соседи" name="roommates" isTrue={props.roommates} setIsTrue={props.setRoommates} />
         </div>
         <div className="filters--buttons">
            <button className="button price" onClick={() => {setPriceActive(true)}}><FontAwesomeIcon icon={faTag} className="icon" />Цена</button>
            <Modal active = {priceActive} setActive={setPriceActive}>
               <h2 className="title">Цена</h2>
               <MultiRangeSlider
                  min={5000}
                  max={100000}
                  onChange={({ min, max }) => {props.setMin(min); props.setMax(max)}}
               />
               <button className="submit-btn" onClick={() => props.setFilters(!props.new)}>Применить</button>
            </Modal>
            <button className="button apartament"><FontAwesomeIcon icon={faBuilding} className="icon" />Тип</button>
            <button className="button floor"><FontAwesomeIcon icon={faStairs} className="icon" />Этаж</button>
            <button className="button more"><FontAwesomeIcon icon={faSliders} className="icon" />Другое</button>
         </div>
         <label ref={ref} className="filters--sort-by" data-visible={showSortBy} onClick={toggleShowSortBy}>Сортировать по: <span>
               {props.sortBy[0] === 'amount' ? 'Цене ' : props.sortBy[0] === 'createdAt' ? 'Новизне ' : props.sortBy[0] === 'area' ? 'Площади ' : 'Отзывам '} 
               {props.sortBy[1] ? props.sortBy[1] === 'desc' ? <FontAwesomeIcon icon={faArrowDownWideShort} className="icon" /> : <FontAwesomeIcon icon={faArrowDownShortWide} className="icon" /> : null}
            </span>
            <ul>
               {
                  props.sortBy[0] === 'amount' ? 
                  props.sortBy[1] === 'desc' ? 
                  <li onClick={() => {props.setSortBy(['amount', 'asc']); toggleShowSortBy()}}>Цене <FontAwesomeIcon icon={faArrowDownShortWide} className="icon" /></li> :
                  <li onClick={() => {props.setSortBy(['amount', 'desc']); toggleShowSortBy()}}>Цене <FontAwesomeIcon icon={faArrowDownWideShort} className="icon" /></li> :
                  <>
                     <li onClick={() => {props.setSortBy(['amount', 'asc']); toggleShowSortBy()}}>Цене <FontAwesomeIcon icon={faArrowDownShortWide} className="icon" /></li>
                     <li onClick={() => {props.setSortBy(['amount', 'desc']); toggleShowSortBy()}}>Цене <FontAwesomeIcon icon={faArrowDownWideShort} className="icon" /></li>
                  </>
               }
               {props.sortBy[0] !== 'Отзывам' && <li onClick={() => {props.setSortBy(['Отзывам']); toggleShowSortBy()}}>Отзывам</li>}
               {props.sortBy[0] !== 'createdAt' && <li onClick={() => {props.setSortBy(['createdAt']); toggleShowSortBy()}}>Новизне</li>}
               {props.sortBy[0] !== 'area' && <li onClick={() => {props.setSortBy(['area']); toggleShowSortBy()}}>Площади</li>}
            </ul>
         </label>
      </div>
   )
}