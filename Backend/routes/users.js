const express = require('express');
// const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product')

// Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log('Request body:', req.body);

const { name, username, email, phone, password } = req.body;
console.log('Field values:', { name, username, email, phone, password });

// Create a new user
const user = new User({
  name,
  username,
  email,
  phone,
  password,
});


    
await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred'});
  }
});

//user login in
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.status(200).json({ message: 'Login successful', token, userId: user._id });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//get general info of the user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Buy a course
router.post('/:userId/buy/:courseId', async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const course = await Product.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Add the course to the user's boughtCourses array with purchase date
    user.boughtCourses.push({
      course: course,
      purchaseDate: new Date(),
    });
    await user.save();

    res.json({ message: 'Course successfully bought' });
  } catch (error) {
    console.error('Error buying course:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Rent a course
router.post('/:userId/rent/:courseId', async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const course = await Product.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Calculate the rental end date based on course's rental duration
    const rentalDurationMilliseconds = course.duration * 24 * 60 * 60 * 1000;

    // Calculate rental end date
    const rentalEndDate = new Date();
    rentalEndDate.setTime(rentalEndDate.getTime() + rentalDurationMilliseconds);

    // Add the course to the user's rentals array with start and end dates
    user.rentals.push({
      course: course,
      rentalStartDate: new Date(),
      rentalEndDate: rentalEndDate,
    });
    await user.save();

    res.json({ message: 'Course successfully rented' });
  } catch (error) {
    console.error('Error renting course:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//get rented courses for a user
router.get('/rented-courses/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate('rentals.course');
    res.status(200).json(user.rentals);
  } catch (error) {
    console.error('Error getting rented courses:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get bought courses for a user
router.get('/bought-courses/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate('boughtCourses.course');
    res.status(200).json(user.boughtCourses);
  } catch (error) {
    console.error('Error getting bought courses:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;


