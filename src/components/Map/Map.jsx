import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { ZoomControl, RotationControl, Marker, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.scss'
import { usePosition } from 'use-position'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const MapGL = ReactMapboxGl({
   accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
   pitchWithRotate: false
});

export default function Map(props) {

   const { latitude, longitude } = usePosition()

   const [selectedMarker, setSelectedMarker] = React.useState(null)

   const [center, setCenter] = React.useState(null)

   const changeMapLanguage = (map) => {
      map.getStyle().layers.forEach((layer) => {
          if (layer.id.endsWith('-label')) {
              map.setLayoutProperty(layer.id, 'text-field', [
                  'coalesce',
                  ['get', 'name_ru'],
                  ['get', 'name'],
              ])
          }
      })
   }

   const [priceFilters, setPriceFilters] = React.useState([])
   const [typeFilters, setTypeFilters] = React.useState([])

   React.useEffect(() => {
      setPriceFilters([props.minPrice, props.maxPrice])
      setTypeFilters([...props.types])
   }, [props.new])

   // * Закоментировал, чтобы не тратить вызовы апи
   const MarkerElements = props.data.map((apartment, index) => (
      apartment.isOn && 
      apartment.amount <= priceFilters[1] && apartment.amount >= priceFilters[0] && 
      !typeFilters.includes(apartment.apartmentType.toLowerCase()) && 
      ((props.roommates && apartment.roommates[0]) || (!props.roommates && !apartment.roommates[0]) || (!props.roommates && apartment.roommates[0])) &&
      <Marker 
      key={index}
      className='marker'
      coordinates={apartment.coordinates}
      anchor={"bottom"}
      >
         <FontAwesomeIcon 
            icon={faLocationDot} 
            className='pin' 
            onClick={e => {
               e.preventDefault()
               setSelectedMarker(apartment)
               setCenter(apartment.coordinates)
            }}
         />
      </Marker> 
      )
   )

   const customPopup = (data) => {
      return (
      <Popup
         className='popup'
         coordinates={data.coordinates}
         anchor={"bottom"}
         >
            <h3 className="popup--address"><FontAwesomeIcon icon={faLocationDot} className="icon" /> {data.street}, д.{data.houseNum}, кв.{data.apartmentNum}</h3>
            <div className="bottom">
               <span className='popup--price'>{data.amount}{data.currency} /{data.per}</span>
               <Link className='popup--details' to={process.env.PUBLIC_URL + `/apartment/${data._id}`}>Подробная информция</Link>
            </div>
      </Popup>
   )}

   return (
      <div className="map">
         <MapGL
         className='mapbox'
         style="mapbox://styles/mapbox/streets-v11"
         center={center ? center : [longitude ? longitude : 37.6156, latitude ? latitude : 55.7522]}
         containerStyle={{
            height: '100%',
            width: '100%'
         }}
         renderChildrenInPortal={true}
         onClick={e => {
            setSelectedMarker(null)
         }}
         onStyleLoad={changeMapLanguage}
         >
            {MarkerElements} 
            {selectedMarker && customPopup(selectedMarker)
            }
            <ZoomControl />
            <RotationControl />
         </MapGL>
      </div>
   )
}