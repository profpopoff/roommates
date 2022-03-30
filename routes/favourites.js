const router = require('express').Router()
const Favourites = require('../models/Favourites')
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verify')

// * CREATE
router.post('/', verifyToken, async (req, res) => {
   const newFavourites = new Favourites(req.body)

   try {
      const savedFavourites = await newFavourites.save()
      res.status(200).json(savedFavourites)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * UPDATE
router.put('/:id', verifyTokenAndAutherization, async (req, res) => {
   try {
      const updatedFavourites = await Favourites.findByIdAndUpdate(req.params.id, {
         $set: req.body
      }, { new: true })
      res.status(200).json(updatedFavourites)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * DELETE
router.delete('/:id', verifyTokenAndAutherization, async (req, res) => {
   try {
      await Favourites.findByIdAndDelete(req.params.id)
      res.status(200).json('Favourites has been deleted')
   } catch (error) {
      res.status(500).json(error)
   }
})

// * GET USER FAVOURITES
router.get('/find/:userid', verifyTokenAndAutherization, async (req, res) => {
   try {
      const favourites = await Favourites.findOne({ userId: req.params.userid })

      res.status(200).json(favourites)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * GET ALL 
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   try {
      const favourites = await Favourites.find()
      res.status(200).json(favourites)
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router