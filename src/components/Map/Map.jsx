import React from 'react'
import ReactMapboxGl, { ZoomControl, RotationControl, Layer, Feature, Marker, Popup } from 'react-mapbox-gl'
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.scss'
import { usePosition } from 'use-position'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'



const MapGL = ReactMapboxGl({
   accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
   pitchWithRotate: false
});



// * Закоментировал, чтобы не тратить вызовы апи
// function getAddressCoordinates(address) {
//    const latlen = []
//    fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOCODER_TOKEN}&query=${address}`)
//       .then(res => res.json())
//       .then(data => latlen.push(data.data[0].longitude, data.data[0].latitude))
//    return latlen
// }



export default function Map(props) {

   const { latitude, longitude } = usePosition()

   const [selectedMarker, setSelectedMarker] = React.useState(null)
   const [center, setCenter] = React.useState(null)
   const [zoom, setZoom] = React.useState(11)

   const changeMapLanguage = (map) => {
      map.getStyle().layers.forEach((layer) => {
          if (layer.id.endsWith('-label')) {
              map.setLayoutProperty(layer.id, 'text-field', [
                  'coalesce',
                  ['get', 'name_ru'],
                  ['get', 'name'],
              ]);
          }
      });
   };

   // * Закоментировал, чтобы не тратить вызовы апи
   const MarkerElements = props.positions.map((position, index) => {
      return (
         <Marker 
            key={index}
            className='marker'
            coordinates={position.coordinates}
            anchor={"bottom"}
         >
            <FontAwesomeIcon 
               icon={faLocationDot} 
               className='pin' 
               onClick={e => {
                  e.preventDefault()
                  setSelectedMarker(position.coordinates)
                  setCenter(position.coordinates)
                  setZoom(15)
               }}
            />
         </Marker>
         )
      }
   )

   return (
      <div className="map">
         <MapGL
         className='mapbox'
         style="mapbox://styles/mapbox/streets-v11"
         center={center ? center : [longitude ? longitude : 37.6156, latitude ? latitude : 55.7522]}
         zoom={[zoom]}
         containerStyle={{
            height: '100%',
            width: '100%'
         }}
         onClick={e => {
            setSelectedMarker(null)
            setZoom(11)
         }}
         onStyleLoad={changeMapLanguage}
         >
            {MarkerElements} 
            {selectedMarker && (
               <Popup
               className='popup'
               coordinates={selectedMarker}
               anchor={"bottom"}
               onClick={e => {
                  selectedMarker && setCenter(selectedMarker)
               }}
               >
                  <h2>test</h2>
               </Popup>
            )}
            <ZoomControl />
            <RotationControl />
         </MapGL>
      </div>
   )
}