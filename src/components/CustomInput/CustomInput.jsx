import React from "react"
import './CustomInput.scss'

export default function CustomInput(props) {
   return (
      <div className="form__group field">
         <input type={props.type} className="form__field" placeholder={props.label} name={props.name} id={props.name} required />
         <label htmlFor={props.name} className="form__label">{props.label}</label>
      </div>
   )
}