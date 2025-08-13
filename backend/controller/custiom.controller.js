// services/telegramService.js
const axios = require('axios');

const TELEGRAM_API_TOKEN = '7786553835:AAHn3PPyLoyBUOTckFvykwHSDAJn7lf04k0';
const CHAT_ID = '667605413';

const sendMessageToTelegram = async (message) => {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
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
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMediaGroup`, {
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