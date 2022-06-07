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
   const [typeActive, setTypeActive] = React.useState(false)
   const [floorActive, setFloorActive] = React.useState(false)
   const [filtersActive, setFiltersActive] = React.useState(false)

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

   const [showIsRoom, setShowIsRoom] = React.useState(false)

   React.useEffect(() => {
      setShowIsRoom(props.isRoom)
   }, [props.new])

   return (
      <div className="filters">
         <article className="filters--article">
            <h1 className="title">{showIsRoom ? 'Комнаты' : 'Жилье'} в <span>Санкт-Петербурге</span></h1>
            <p className="result-num">{showIsRoom ? '4' : props.roommates ? '5' : props.data.length} результат{showIsRoom ? 'а' : 'ов'}</p>
         </article>
         <div className="filters--roommates">
            <CustomToggle label="С соседями" name="roommates" isTrue={props.roommates} setIsTrue={props.setRoommates} />
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
               <button className="submit-btn" onClick={() => {props.setFilters(!props.new); setPriceActive(false)}}>Применить</button>
            </Modal>
            <button className="button apartament" onClick={() => {setTypeActive(true)}}><FontAwesomeIcon icon={faBuilding} className="icon" />Тип</button>
            <Modal active = {typeActive} setActive={setTypeActive}>
               <h2 className="title">Тип</h2>
               <div className="toggles">
                  <CustomToggle className="toggle" label="Спальное место" name="bed" isTrue={false} />
                  <CustomToggle className="toggle" label="Комната" name="room" isTrue={props.isRoom} setIsTrue={props.setIsRoom} />
                  <CustomToggle className="toggle" label="Квартира" name="flat" isTrue={false} />
                  <CustomToggle className="toggle" label="Дом" name="house" isTrue={false} />
                  <CustomToggle className="toggle" label="Таунхаус" name="townhouse" isTrue={false} />
               </div>
               <button className="submit-btn" onClick={() => {props.setFilters(!props.new); setTypeActive(false)}}>Применить</button>
            </Modal>
            <button className="button floor" onClick={() => {setFloorActive(true)}}><FontAwesomeIcon icon={faStairs} className="icon" />Этаж</button>
            <Modal active = {floorActive} setActive={setFloorActive}>
               <h2 className="title">Этаж</h2>
               <MultiRangeSlider
                  min={1}
                  max={14}
                  onChange={({ min, max }) => {}}
               />
               <button className="submit-btn" onClick={() => props.setFilters(!props.new)}>Применить</button>
            </Modal>
            <button className="button more" onClick={() => {setFiltersActive(true)}}><FontAwesomeIcon icon={faSliders} className="icon" />Другое</button>
            <Modal active = {filtersActive} setActive={setFiltersActive}>
               <h2 className="title">Фильтры</h2>
               
               <button className="submit-btn" onClick={() => props.setFilters(!props.new)}>Применить</button>
            </Modal>
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