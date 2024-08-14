const Product = require('./models/Product');
const User = require('./models/User');
const Rental = require('./models/Rental');
const BoughtCourse = require('./models/BoughtCourse');
const connectDB = require('./db');


connectDB();
// Create a new product
// const newProduct = new Product({
//   title: 'Course Title',
//   description: 'Course description',
//   price: 99,
//   rentalPrice: 49,
//   duration: 30,
// });

const fictionalCourses = [
  {
    title: "Complete React Development",
    description: "Master React and build dynamic user interfaces.",
    price: 89.99,
    rentalPrice: 49.99,
    duration: 45,
  },
  {
    title: "Node.js for Beginners",
    description: "Learn server-side JavaScript with Node.js and Express.",
    price: 69.99,
    rentalPrice: 39.99,
    duration: 30,
  },
  {
    "title": "Python Programming Essentials",
    "description": "Get started with Python and explore its versatile capabilities.",
    "price": 79.99,
    "rentalPrice": 44.99,
    "duration": 40
  },
  {
    "title": "Introduction to Machine Learning",
    "description": "Dive into the world of machine learning and data analysis.",
    "price": 99.99,
    "rentalPrice": 59.99,
    "duration": 50
  },
  {
    "title": "Web Design Fundamentals",
    "description": "Learn the principles of effective web design and layout.",
    "price": 59.99,
    "rentalPrice": 34.99,
    "duration": 35
  }

];


async function addCoursesToDatabase() {
  try {
    for (const courseData of fictionalCourses) {
      const newCourse = new Product(courseData);
      await newCourse.save();
      console.log('Course saved:', newCourse.title);
    }
  } catch (error) {
    console.error('Error adding courses:', error);
  }
}

addCoursesToDatabase();

// // Create a new user
// const newUser = new User({
//   name: 'John Doe',
//   username: 'johndoe',
//   email: 'johndoe@example.com',
//   password: 'hashedpassword',
// });

// newUser.save()
//   .then(() => {
//     console.log('User saved');
//   })
//   .catch((error) => {
//     console.error('Error saving user:', error);
//   });

// ... Similar code for Rental and BoughtCourse
