const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product model
  rentalStart: Date,
  rentalExpiration: Date,
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
