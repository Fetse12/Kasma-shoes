const express = require('express');
const {
    createShoe,
    createMultipleShoes,
    getAllShoes,
    getShoeById,
    updateShoe,
    deleteShoe,
} = require('../controller/shoes.controller.js');

const router = express.Router();

// Create a new shoe
router.post('/', createShoe);

// Create multiple shoes at once
router.post('/multiple', createMultipleShoes);

// Get all shoes
router.get('/', getAllShoes);

// Get a specific shoe by ID
router.get('/:id', getShoeById);

// Update a shoe by ID
router.put('/:id', updateShoe);

// Delete a shoe by ID
router.delete('/:id', deleteShoe);

// Export the router for use in other modules
module.exports = router;