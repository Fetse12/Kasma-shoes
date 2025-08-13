// routes/orderRoute.js
const axios = require("axios");

const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../config/cloudinary.config.js');
const TELEGRAM_API_TOKEN = '7209021616:AAH3hQmqiwqAJN4dlwi6FVRueqNU5hcRRYQ';
const CHAT_ID = '667605413';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        console.log(req.body);

        const { name, phone, address, shoeSize } = req.body;
        const photo = req.file;


        const imageUrl = await uploadImage(photo)
        console.log(imageUrl);

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `
            Customized order from:        
                 from Name: ${name}
                   Phone Number: ${phone}
                   with shoesize : ${shoeSize}
                   with adress : ${address}
                   `,
        });
        const images = [imageUrl]
        const mediaGroup = images.map((Url) => ({
            type: 'photo',
            media: Url,
        }));

        // Send media group
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMediaGroup`, {
            chat_id: CHAT_ID,
            media: mediaGroup,
        });

        res.status(200).json({ message: 'Message and image sent to Telegram' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Failed to send message or image to Telegram', error: error.message });
    }
});

// Export the router for use in other modules
module.exports = router;