const mongoose = require('mongoose')

const ApartmentsSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, unique: true },
      address: { type: String, required: true, unique: true },
      desc: { type: String, required: true },
      img: { type: String, required: true },
      conveniences: { type: Array },
      reviews: [
         {
            userId: { type: String },
            rating: { type: Number },
            review: { type: String }
         }
      ],
      price: { type: Number, required: true }
   },
   { timestamps: true }
)

module.exports = mongoose.model('Apartments', ApartmentsSchema)