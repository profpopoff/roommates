const router = require('express').Router()
const User = require('../models/User')
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verify')

// * UPDATE
router.put('/:id', verifyTokenAndAutherization, async (req, res) => {
   if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS).toString()
   }

   try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
         $set: req.body
      }, { new: true })
      res.status(200).json(updatedUser)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * DELETE
router.delete('/:id', verifyTokenAndAutherization, async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User has been deleted')
   } catch (error) {
      res.status(500).json(error)
   }
})

// * GET USER
router.get('/find/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
      const { password, ...otherInfo } = user._doc

      res.status(200).json(otherInfo)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   try {
      const users = await User.find(req.params.id)

      res.status(200).json(users)
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router