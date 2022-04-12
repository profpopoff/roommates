import React from "react"
import './Message.scss'
import userImg from '../../assets/cover.jpeg'
import { format } from 'timeago.js'

export default function Message(props) {
   return (
      <div className={`message ${props.own && 'own'}`}>
         
         <div className="message-body">
            <img src={userImg} alt="" className="message-img" />
            <div className="message-text">
               {props.message.text}
               <div className="message-time">{format(props.message.createdAt)}</div>
            </div>
         </div>
         
      </div>
   )
}