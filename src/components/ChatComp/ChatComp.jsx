import React from "react"
import axios from 'axios'
import './ChatComp.scss'
import Message from "../Message/Message"
import Conversation from "../Conversation/Conversation"
import { AuthContex } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function ChatBox() {

   const auth = React.useContext(AuthContex)
   
   const [conversations, setConversations] = React.useState([])
   const [currentChat, setCurrentChat] = React.useState(null)
   const [messages, setMessages] = React.useState([])
   const [newMessage, setNewMessage] = React.useState('')
   const scrollRef = React.useRef()

   React.useEffect(() => {
      const getConversations = async () => {
         try {
            const res = await axios.get('api/conversations/' + auth.userId)
            setConversations(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      getConversations()
   }, [auth.userId])

   React.useEffect(() => {
      const getMessages = async () => {
         try {
            const res = await axios.get('api/messages/' + currentChat?._id)
            setMessages(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      getMessages()
   }, [currentChat])

   const handleSubmit = async (e) => {
      e.preventDefault()
      const message = {
         sender: auth.userId,
         text: newMessage,
         conversationId: currentChat._id
      }

      try {
         const res = await axios.post('api/messages', message)
         setMessages([...messages, res.data])
         setNewMessage('')
      } catch (error) {
         console.log(error)
      }
   }

   React.useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior: 'smooth'})
   }, [messages])

   return (
      <>
      <div className="chat-menu">
         <h2>Доступные собеседники</h2>
         {conversations.map(conversation => (
            <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
               <Conversation conversation={conversation} userId={auth.userId} />
            </div>
         ))}
      </div>
      {
         currentChat &&
         <div className="chat-box">
            <div className="chat-box-top">
               {
                  messages.map(message => (
                     <div ref={scrollRef}>
                        <Message message={message} own={message.sender === auth.userId} />
                     </div>
                  ))
               }
            </div>
            <div className="chat-box-bottom">
               <textarea 
               className="textarea" 
               placeholder="Напишите что-нибудь..."
               onChange={(e) => setNewMessage(e.target.value)}
               value={newMessage}
               ></textarea>
               <button className="chat-box-btn" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
         </div>
      }
      </>
   )
}