

const axios = require('axios');
require('dotenv').config();

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN;
const CHAT_ID = '502935395';

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

const sendImagesToTelegram = async (imageUrls) => {
    try {
        for (const url of imageUrls) {
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendPhoto`, {
                chat_id: CHAT_ID,
                photo: url
            });
        }
        console.log('Images sent:', imageUrls);
    } catch (error) {
        console.error('Error sending images:', error.response ? error.response.data : error.message);
    }
};

module.exports = { sendMessageToTelegram, sendImagesToTelegram };
