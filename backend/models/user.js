const mongoose = require("mongoose");

const useSchema = mongoose.Schema({
    Telegram_username: {
        type: String,
        unique: true
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', useSchema);

// Export the User model for use in other modules
module.exports = User;