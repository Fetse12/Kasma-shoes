const express = require('express');
const { login, signout, signup } = require('../controller/auth.controller.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/signout', signout);

// Export the router for use in other modules
module.exports = router;