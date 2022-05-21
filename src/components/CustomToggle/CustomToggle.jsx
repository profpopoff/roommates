import React from "react"
import './CustomToggle.scss'

export default function CustomToggle(props) {

   // const [isTrue, setIsTrue] = React.useState(props.checked)
   // console.log(props.isTrue)

   return (
      <div className="custom-toggle">
         <label htmlFor={props.name}>{props.label}</label>
         <input type="checkbox" id={props.name} className="toggle-button" defaultChecked={props.isTrue} value={props.name} onChange={() => props.setIsTrue(!props.isTrue)} />
      </div>
   )
}