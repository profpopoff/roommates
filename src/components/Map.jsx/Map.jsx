import React from 'react'
import './Map.scss'
import ReactMapboxGl, { ZoomControl, RotationControl } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { usePosition } from 'use-position'

const MapGL = ReactMapboxGl({
   accessToken:
      'pk.eyJ1IjoicHJvZnBvcG9mZiIsImEiOiJjbDFncDQ1ajYwMmozM2NuM2FrcXRhcXR5In0.sjAiLmiH_tODylWo9IX-9Q',
      pitchWithRotate: false
});

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

export default function Map() {

   const { latitude, longitude } = usePosition()

   return (
      <div className="map">
         <MapGL
         className='mapbox'
         style="mapbox://styles/mapbox/streets-v11"
         center={[longitude ? longitude : 37.6156, latitude ? latitude : 55.7522]}
         containerStyle={{
            height: '100%',
            width: '100%'
         }}
         onStyleLoad={changeMapLanguage}
         >
            <ZoomControl />
            <RotationControl />
         </MapGL>;
      </div>
   )
}