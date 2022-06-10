const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const apartmentRouter = require('./routes/apartment')
const favouritesRouter = require('./routes/favourites')
const messagesRouter = require('./routes/messages')
const conversationsRouter = require('./routes/conversations')
const multer = require('multer')
const path = require('path')
const { Socket } = require('socket.io')

const app = express()

app.use(express.json({ extended: true }))

dotenv.config()

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => console.log('Database is connected...'))
   .catch((error) => console.log(error))

app.use('/images', express.static(path.join(__dirname, 'public/images')))

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/images')
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name)
   }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
   try {
      return res.status(200).json('File uploaded')
   } catch (error) {
      console.log(error)
   }
})

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/apartments', apartmentRouter)
app.use('/api/favourites', favouritesRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/conversations', conversationsRouter)

const server = app.listen(process.env.PORT || 5000, () => {
   console.log('Server is running...')
})

const io = require('socket.io')(server, {
   pingTimeout: 60000,
   cors: {
      origin: 'http://localhost:3000',
   }
})

io.on('connection', (socket) => {
   console.log('connected to socket.io')

   socket.on('setup', (userId) => {
      socket.join(userId)
      console.log(userId)
      socket.emit('connected')
   })

   socket.on('join chat', (room) => {
      socket.join(room)
      console.log('user joined room: ' + room)
   })

   socket.on('new message', (newMessageRecieved) => {
      if (!newMessageRecieved.members) return console.log('chat.users not defined')
      newMessageRecieved.members.forEach(user => {
         if (user !== newMessageRecieved.sender) {
            socket.in(user).emit('message recieved', newMessageRecieved)
         }
         else {return}
         
      })
   })

})