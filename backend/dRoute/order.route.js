const express = require('express');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('../controller/order.controller.js');
const { sendMessage } = require('../controller/sendmessage.controller.js');

const router = express.Router();

// Create a new order
router.post('/orders', createOrder);

// Get all orders
router.get('/orders', getAllOrders);

// Get a specific order by ID
router.get('/orders/:id', getOrderById);

// Update an order by ID
router.put('/orders/:id', updateOrder);

// Delete an order by ID
router.delete('/orders/:id', deleteOrder);

// Send message to bot
router.post('/sendToBot', sendMessage);

// Export the router for use in other modules
module.exports = router;