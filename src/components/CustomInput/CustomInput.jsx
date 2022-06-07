import React from "react"
import './CustomInput.scss'

export default function CustomInput(props) {

   const [text, setText] = React.useState()

   React.useEffect(() => {
      setText(props.value)
   }, [props.value])
   
   return (
      <div className="form__group field">
         <input 
            autoComplete="off"
            type={props.type} 
            className="form__field" 
            placeholder={props.label} 
            name={props.name} 
            id={props.name} required 
            value={text}
            onChange={e => {setText(e.target.value); props.handleChange(e)}}
         />
         <label htmlFor={props.name} className="form__label">{props.label}</label>
      </div>
   )
}