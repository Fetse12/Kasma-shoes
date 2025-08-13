const Order = require("../models/orders.js");

// Create a new order
const createOrder = async (req, res) => {
    const { fullName, shoes_id, orderDeliverd, phoneNumber, userId } = req.body;

    try {
        const newOrder = new Order({
            fullName,
            shoes_id,
            orderDeliverd: orderDeliverd || 'notDeliverd', // default value
            phoneNumber,
            userId
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

// Export the functions for use in other modules
module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};