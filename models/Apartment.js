const mongoose = require('mongoose')

const ApartmentsSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, unique: true },
      address: { type: String, required: true, unique: true },
      coordinates: { type: Array },
      amount: { type: Number, required: true },
      currency: { type: String },
      per: { type: String, required: true },
      images: [{ type: String, required: true }],
      desc: { type: String, required: true },
      conveniences: { type: Array },
      floor: { type: Number, required: true },
      area: { type: Number, required: true },
      rooms: { type: String, required: true },
      landlordId: { type: String, required: true },
      roommates: [{ type: String }],
      reviews: [
         {
            userId: { type: String },
            rating: { type: Number },
            review: { type: String }
         }
      ],
   },
   { timestamps: true }
)

module.exports = mongoose.model('Apartments', ApartmentsSchema)