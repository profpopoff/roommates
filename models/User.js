const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
   {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false },
      phoneNumber: { type: String, required: true, unique: true }
   },
   { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)