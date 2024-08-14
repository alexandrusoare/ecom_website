const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  boughtCourses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      purchaseDate: { type: Date, default: Date.now },
    },
  ],
  rentals: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      rentalStartDate: { type: Date, default: Date.now },
      rentalEndDate: { type: Date }, // Set this based on rental duration
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;