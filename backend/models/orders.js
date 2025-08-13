const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    shoes_id: [{
        type: String,
        required: true,
    }],
    orderDeliverd: {
        type: String,
        enum: ['deliverd', 'notDeliverd'],
        default: 'notDeliverd'
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

// Export the Order model for use in other modules
module.exports = Order;