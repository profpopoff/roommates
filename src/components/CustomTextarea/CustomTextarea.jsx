import React from "react"
import './CustomTextarea.scss'

export default function CustomTextarea(props) {

   const [text, setText] = React.useState(props.value)

   return (
      <div className="custom-textare">
         <textarea 
         className="textarea" 
         placeholder={props.placeholder} 
         name={props.name} 
         value={text}
         onChange={e => {setText(e.target.value); props.handleChange(e)}}
         >
            
         </textarea>
         <label className="label" htmlFor={props.name} style={{fontSize: "1.5rem"}}>{props.label}</label>
      </div>
   )
}