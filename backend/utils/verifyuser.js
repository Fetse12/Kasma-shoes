const jwt = require('jsonwebtoken');
const errorHandler = require('./error.js'); // Adjusted for CommonJS

const verifyUser = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next();
    });
};

// Export the verifyUser middleware for use in other modules
module.exports = verifyUser;