const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    favorite_food_id: [{
        type: Object,
        required: true,
    }]
}, {
    timestamps: true
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

// Export the Favorite model for use in other modules
module.exports = Favorite;