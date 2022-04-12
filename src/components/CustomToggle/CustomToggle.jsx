import React from "react"
import './CustomToggle.scss'

export default function CustomToggle(props) {

   const [isTrue, setIsTrue] = React.useState(props.checked)

   return (
      <div className="custom-toggle">
         <label htmlFor={props.name}>{props.label}</label>
         <input type="checkbox" id={props.name} className="toggle-button" defaultChecked={isTrue} value={props.name} onChange={props.onChange} />
      </div>
   )
}