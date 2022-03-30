const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const apartmentRouter = require('./routes/apartment')
const favouritesRouter = require('./routes/favourites')

const app = express()

dotenv.config()

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => console.log('Database is connected...'))
   .catch((error) => console.log(error))

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/apartments', apartmentRouter)
app.use('/api/favourites', favouritesRouter)

app.listen(process.env.PORT || 5000, () => {
   console.log('Server has been started...')
})