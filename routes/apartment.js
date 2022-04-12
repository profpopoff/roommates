const router = require('express').Router()
const Apartment = require('../models/Apartment')
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verify')

// * CREATE
router.post('/', verifyToken, async (req, res) => {
   const newApartment = new Apartment(req.body)

   try {
      const savedApartment = await newApartment.save()
      res.status(200).json(savedApartment)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * UPDATE
router.put('/:id', verifyToken, async (req, res) => {
   try {
      const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, {
         $set: req.body
      }, { new: true })
      res.status(200).json(updatedApartment)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * DELETE
router.delete('/:id', verifyToken, async (req, res) => {
   try {
      await Apartment.findByIdAndDelete(req.params.id)
      res.status(200).json('post has been deleted')
   } catch (error) {
      res.status(500).json(error)
   }
})

// * GET APARTMENT
router.get('/find/:id', async (req, res) => {
   try {
      const apartment = await Apartment.findById(req.params.id)

      res.status(200).json(apartment)
   } catch (error) {
      res.status(500).json(error)
   }
})

// * GET ALL APARTMENTS
router.get('/', async (req, res) => {
   try {
      const apartments = await Apartment.find(req.params.id)

      res.status(200).json(apartments)
   } catch (error) {
      res.status(500).json(error)
   }
})

module.exports = router