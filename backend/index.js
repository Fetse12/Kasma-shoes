// index.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(cors());

// Import routes
const authRouter = require('./dRoute/auth.route.js');
const shoeRoute = require('./dRoute/shoes.route.js');
const orderRoute = require('./dRoute/order.route.js');
const searchRoute = require('./dRoute/search.route.js');
const favoriteRoute = require('./dRoute/favorite.route.js');
const customOrderRoute = require('./dRoute/custom.route.js');
// Routes
// index.js or app.js

app.use('/uploads', express.static('uploads'));
app.use('/api', customOrderRoute);
app.use('/api/auth', authRouter);         // Authentication routes
app.use('/api/shoes', shoeRoute);         // Shoe management routes
app.use('/api/orders', orderRoute);       // Order management routes
app.use('/api/search', searchRoute);      // Search routes
app.use('/api/favorites', favoriteRoute); // Favorites/Wishlist routes

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Kasma Shoes API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
