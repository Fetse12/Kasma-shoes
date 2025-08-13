const mongoose = require("mongoose");

const shoesSchema = mongoose.Schema({
    shoes_name: {
        type: String,
        required: true,
    },
    shoes_type: {
        type: String,
        enum: ['men', 'women', 'boy', 'girl'],
        required: true,
    },
    type: {
        type: String,
        enum: ['sneakers', 'formal_shoes', 'boots', 'heels', 'athletic_shoes', 'flip_flops', 'sandals', 'running_shoes'],
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    isSpecial: {
        type: Boolean,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    shoe_Size: {
        type: Number,
        required: true,
    },
    DiscountPercent: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: [{
        type: String,
        required: true,
    }],
    tags: [{
        type: String,
    }],
}, {
    timestamps: true,
});

const Shoes = mongoose.model('Shoes', shoesSchema);

// Export the Shoes model for use in other modules
module.exports = Shoes;