const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
   {
      fullName: { type: String, required: true, min: 3 },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false },
      phoneNumber: { type: String, required: true, unique: true },
      profilePicture: { type: String },
      favourites: { type: Array }
   },
   { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)