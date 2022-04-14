import React from "react"
import axios from 'axios'
import './Message.scss'
import userImg from '../../assets/default-user.png'
import { AuthContex } from '../../context/AuthContext'
import { format } from 'timeago.js'

export default function Message(props) {

   const auth = React.useContext(AuthContex)

   const PF = process.env.REACT_APP_PUBLIC_FOLDER

   return (
      <div className={`message ${props.own && 'own'}`}>
         
         <div className="message-body">
            <img src={props.own ? PF + auth.userPicture : ( props.notMe?.profilePicture ? PF + props.notMe.profilePicture : userImg)} alt="" className="message-img" />
            
            <div className="message-text">
               {props.message.text}
               <div className="message-time">{format(props.message.createdAt)}</div>
            </div>
         </div>
         
      </div>
   )
}