const mongoose = require('mongoose')

const ApartmentsSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, unique: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      houseNum: { type: String, required: true },
      apartmentNum: { type: Number, required: true },
      coordinates: { type: Array },
      amount: { type: Number, required: true },
      currency: { type: String },
      per: { type: String},
      images: { type: Array },
      desc: { type: String, required: true },
      conveniences: { type: Array },
      floor: { type: Number, required: true },
      area: { type: Number, required: true },
      rooms: { type: Number, required: true },
      landlordId: { type: String, required: true },
      roommates: [{ type: String }],
      isOn: { type: Boolean, default: true },
      apartmentType: { type: String, default: 'Flat' },
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