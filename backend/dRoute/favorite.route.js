const express = require('express');
const { getFavoriteById, updatefavorite } = require('../controller/Favorite.controller.js');

const router = express.Router();

router.put('/favorites/:id', updatefavorite);
router.get('/favorites/:id', getFavoriteById);

// Export the router for use in other modules
module.exports = router;