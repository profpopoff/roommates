import React from "react"
import axios from 'axios'
import './ChatComp.scss'
import Message from "../Message/Message"
import Conversation from "../Conversation/Conversation"
import { AuthContex } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000'
let socket, selectedChatCompare

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
      socket = io(ENDPOINT)
      socket.emit('setup', auth.userId)
      socket.on('connection', () => console.log('connected to socket'))
   }, [])

   React.useEffect(() => {
      const getMessages = async () => {
         try {
            const res = await axios.get('api/messages/' + currentChat?._id)
            setMessages(res.data)
            currentChat && socket.emit('join chat', currentChat._id)
         } catch (error) {
            console.log(error)
         }
      }
      getMessages()

      selectedChatCompare = currentChat
   }, [currentChat])

   React.useEffect(() => {
      socket.on('message recieved', (newMessageRecieved) => {
         if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.conversationId) {
            
               auth.setNotification(true)
         } else {
            setMessages([...messages, newMessageRecieved])
         }
      })
   })

   const handleSubmit = async (e) => {
      e.preventDefault()

      const receiverId = currentChat.members.find(member => member !== auth.userId)

      const message = {
         sender: auth.userId,
         text: newMessage,
         members: [receiverId, auth.userId],
         conversationId: currentChat._id
      }

      try {
         const res = await axios.post('api/messages', message)
         socket.emit('new message', res.data)

         setMessages([...messages, res.data])
         setNewMessage('')
      } catch (error) {
         console.log(error)
      }
   }

   React.useEffect(() => {
      scrollRef.current?.scrollIntoView()
   }, [messages])

   const [conversationUser, setConversationUser] = React.useState()

   React.useEffect(() => {
      const otherMember = currentChat?.members.find(member => member !== auth.userId)

      const getUser = async () => {
         if (otherMember) {
            try {
               const res = await axios.get('api/users/find/' + otherMember)
               setConversationUser(res.data)
            } catch (error) {
               console.log(error)
            }
         } else {return}
         
      }
      getUser()
   }, [currentChat])

  

   return (
      <>
      <div className="chat-menu">
         <h2>Доступные собеседники</h2>
         {
            conversations.map(conversation => (
               <div key={conversation._id} onClick={() => {setCurrentChat(conversation); auth.setNotification(false)}}>
                  <Conversation conversation={conversation} userId={auth.userId} />
               </div>
            ))
         }
      </div>
      {
         currentChat &&
         <div className="chat-box">
            <h2 className="chat-box-name">{conversationUser?.fullName}</h2>
            <div className="chat-box-top">
               {
                  messages.map(message => (
                     <div ref={scrollRef} key={message._id}>
                        <Message 
                        message={message} 
                        own={message.sender === auth.userId} 
                        notMe={conversationUser}
                        />
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