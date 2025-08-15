// services/telegramService.js
const axios = require('axios');
import dotenv from 'dotenv';


dotenv.config();
const telegram = process.env.TELEGRAM_API_TOKEN;
if (!telegram) {
    throw new Error("Could not find TELEGRAM_API_TOKEN in environment");
}

const CHAT_ID = '667605413';

const sendMessageToTelegram = async (message) => {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${telegram}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
};

const sendImagesToTelegram = async (images) => {
    try {
        const mediaGroup = images.map((imgUrl) => ({
            type: 'photo',
            media: imgUrl,
        }));
        const response = await axios.post(`https://api.telegram.org/bot${telegram}/sendMediaGroup`, {
            chat_id: CHAT_ID,
            media: mediaGroup,
        });
        console.log('Images sent:', response.data);
    } catch (error) {
        console.error('Error sending images:', error.response ? error.response.data : error.message);
    }
};

// Export the functions for use in other modules
module.exports = {
    sendMessageToTelegram,
    sendImagesToTelegram,
};