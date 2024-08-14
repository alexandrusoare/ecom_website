const mongoose = require('mongoose');

const boughtCourseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product model
  timestamp: Date,
});

const BoughtCourse = mongoose.model('BoughtCourse', boughtCourseSchema);

module.exports = BoughtCourse;
