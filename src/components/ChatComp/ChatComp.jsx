import React from "react"
import axios from 'axios'
import './ChatComp.scss'
import Message from "../Message/Message"
import Conversation from "../Conversation/Conversation"
import { AuthContex } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client'

export default function ChatBox() {

   const auth = React.useContext(AuthContex)
   
   const [conversations, setConversations] = React.useState([])
   const [currentChat, setCurrentChat] = React.useState(null)
   const [messages, setMessages] = React.useState([])
   const [newMessage, setNewMessage] = React.useState('')
   const [arrivalMessage, setArrivalMessage] = React.useState(null)
   const socket = React.useRef()
   const scrollRef = React.useRef()

   React.useEffect(() => {
      socket.current = io('ws://localhost:8900')
      socket.current.on('getMessage', data => {
         setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now()
         })
      })
   }, [])

   React.useEffect(() => {
      arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage])
   }, [arrivalMessage, currentChat])

   React.useEffect(() => {
      socket.current.emit('addUser', auth.userId)
      socket.current.on('getUsers', users => console.log(users))
      socket.current.on('disconnect', users => console.log(users))
   }, [auth.userId])

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

      const receiverId = currentChat.members.find(member => member !== auth.userId)

      socket.current.emit('sendMessage', {
         senderId: auth.userId,
         receiverId, 
         text: newMessage
      })

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

   const [conversationUser, setConversationUser] = React.useState()

   React.useEffect(() => {
      const otherMember = currentChat?.members.find(member => member !== auth.userId)

      const getUser = async () => {
         try {
            const res = await axios.get('api/users/find/' + otherMember)
            setConversationUser(res.data)
         } catch (error) {
            console.log(error)
         }
      }
      getUser()
   }, [currentChat])

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