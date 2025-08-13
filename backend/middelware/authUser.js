const jwt = require('jsonwebtoken');

const AuthUser = (req, res, next) => {
    const token = req.cookies.access_token; // Ensure the correct cookie name

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET); // Use your secret from .env
        req.user = decoded; // Attach decoded user data to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Export the middleware for use in other modules
module.exports = AuthUser;