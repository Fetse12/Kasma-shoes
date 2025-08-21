const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { sendMessageToTelegram, sendImagesToTelegram } = require('../services/telegramService');

require('dotenv').config();

// Cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// POST /api/upload
router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const { name, phone, address, shoeSize } = req.body;

        // Send text message
        const message = `
📦 New Custom Shoe Order!
Name: ${name}
Phone: ${phone}
Address: ${address}
Shoe Size: ${shoeSize}
`;
        await sendMessageToTelegram(message);

        // Send image if uploaded
        if (req.file) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            const imageUrl = result.secure_url;
            await sendImagesToTelegram([imageUrl]);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send order to Telegram' });
    }
});

module.exports = router;
