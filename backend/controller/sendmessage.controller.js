const axios = require("axios");

const TELEGRAM_API_TOKEN = '7209021616:AAH3hQmqiwqAJN4dlwi6FVRueqNU5hcRRYQ';
const CHAT_ID = '667605413';
const CHAT_ID2 = '400603030';


const sendMessage = async (req, res) => {
    try {
        const messages = req.body;

        // Send the initial message
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `Order from Name: ${messages.name}
                   Phone Number: ${messages.phone}
                   Address: ${messages.address}`,
        });
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID2,
            text: `Order from Name: ${messages.name}
                   Phone Number: ${messages.phone}
                   Address: ${messages.address}`,
        });

        // Prepare media group for images
        const mediaGroup = messages.data.map((image) => ({
            type: 'photo',
            media: image.shoe.imgUrl[0],
        }));
        console.log(mediaGroup);

        // Send media group
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMediaGroup`, {
            chat_id: CHAT_ID,
            media: mediaGroup,
        });
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMediaGroup`, {
            chat_id: CHAT_ID2,
            media: mediaGroup,
        });

        // Calculate total and send individual shoe messages
        let total = 0;
        for (let i = 0; i < messages.data.length; i++) {
            total += (parseInt(messages.data[i].quantity) * parseInt(messages.data[i].shoe.Price));
            let telegramMessage = `
                - Shoe name: ${messages.data[i].shoe.name}
                - ${messages.data[i].quantity} X ${messages.data[i].shoe.Price} = ${parseInt(messages.data[i].quantity) * parseInt(messages.data[i].shoe.Price)} ETB
            `;

            await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: telegramMessage
            });
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID2,
                text: telegramMessage
            });
        }

        // Send total order amount
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `Total Order: ${total} ETB`,
        });

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID2,
            text: `Total Order: ${total} ETB`,
        });
        res.status(200).json({ message: 'Message and image sent to Telegram' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message or image to Telegram', error: error.message });
        console.log(error.message);
    }
};

// Export the sendMessage function for use in other modules
module.exports = {
    sendMessage,
};