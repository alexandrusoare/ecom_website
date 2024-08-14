const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rentalPrice: Number,
  duration: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
