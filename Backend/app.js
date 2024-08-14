const express = require('express');
const connectDB = require('./db'); // Import the database connection function

const app = express();
const PORT = 5000;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
