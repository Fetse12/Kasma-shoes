// routes/searchRoutes.js

const express = require('express');
const { searchAll } = require('../controller/search.controller.js');

const router = express.Router();

router.get('/', searchAll);

// Export the router for use in other modules
module.exports = router;