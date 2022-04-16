import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Homepage from './pages/Homepage'
import Apartment from './pages/Apartment'
import Chats from './pages/Chats'
import Favourites from './pages/Favourites'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Property from './pages/Property'
import CreateProperty from './pages/CreateProperty'
import { useAuth } from './hooks/auth.hook'
import { AuthContex } from './context/AuthContext'
import io from 'socket.io-client'

// const ENDPOINT = 'http://localhost:5000'
// let socket, selectedChatCompare

export default function App() {
  const { token, login, logout, userId, userName, userEmail, userPhone, userPicture, isAuthenticated, update } = useAuth()

  // React.useEffect(() => {
  //   socket = io(ENDPOINT)
  //   socket.emit('setup', userId)
  //   socket.on('connection', () => console.log('connected to socket'))
  // }, [])

  // const [messages, setMessages] = React.useState([])
  const [notification, setNotification] = React.useState(false)

    // React.useEffect(() => {
    //   socket.on('message recieved', (newMessageRecieved) => {
    //      // console.log(newMessageRecieved)
    //     if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.conversationId) {
    //       // * give notification
    //       if (!notification.includes(newMessageRecieved)) {
    //         setNotification([newMessageRecieved, ...notification])
              
    //       }
    //       // auth.setNotification()
    //     } else {
    //       setMessages([...messages, newMessageRecieved])
    //     }
    //   })
    // })
    
  return (
    <AuthContex.Provider value={{
      token, login, logout, userId, isAuthenticated, userName, userEmail, userPhone, userPicture, update, notification, setNotification, 
      // socket, messages, setMessages
    }}>
      <Routes>
        <Route path={process.env.PUBLIC_URL + '/'} element={<Layout />}>
          <Route index element={<Homepage />} />
          {
            isAuthenticated ? 
            <>
              <Route path={process.env.PUBLIC_URL + '/chats'} element={<Chats />} />
              <Route path={process.env.PUBLIC_URL + '/favourites'} element={<Favourites />} />
              <Route path={process.env.PUBLIC_URL + '/profile'} element={<Profile />} />
              <Route path={process.env.PUBLIC_URL + '/property'} element={<Property />} />
              <Route path={process.env.PUBLIC_URL + '/create-property'} element={<CreateProperty />} />
            </>
            :
            <>
              <Route path={process.env.PUBLIC_URL + '/register'} element={<Register />} />
            </>
          }
          
          <Route path={'/apartment/:id'} element={<Apartment />} />
          <Route path={process.env.PUBLIC_URL + '/help'} element={<Profile />} />
        </Route>
      </Routes>
    </AuthContex.Provider>
  );
}
