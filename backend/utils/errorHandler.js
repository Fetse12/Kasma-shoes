const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};

// Export the errorHandler function for use in other modules
module.exports = errorHandler;