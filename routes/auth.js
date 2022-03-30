const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// * REGISTER
router.post('/register', async (req, res) => {
   const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS).toString(),
      phoneNumber: req.body.phoneNumber
   })

   try {
      const savedUser = await newUser.save()
      res.status(200).json(savedUser)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * LOGIN
router.post('/login', async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(401).json('Wrong credentials')

      const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8)
      if (decryptedPassword !== req.body.password) return res.status(401).json('Wrong password')

      const accessToken = jwt.sign(
         {
            id: user._id,
            isAdmin: user.isAdmin
         }, 
         process.env.SECRET_JWT,
         { expiresIn: '3d' }
      )

      const { password, ...otherInfo } = user._doc

      res.status(200).json({...otherInfo, accessToken})
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router