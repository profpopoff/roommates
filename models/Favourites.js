const mongoose = require('mongoose')

const FavouritesSchema = new mongoose.Schema(
   {
      userId: { type: String, required: true },
      rents: [
         {
            productId: { type: String }
         }
      ]
   },
   { timestamps: true }
)

module.exports = mongoose.model('Favourites', FavouritesSchema)