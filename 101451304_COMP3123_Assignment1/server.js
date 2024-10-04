const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); // Import your user routes
const employeeRoutes = require('./routes/employee'); // Import your employee routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
