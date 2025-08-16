/**
 * This file contains Express middleware functions for validating incoming requests
 * related to user authentication and authorization. These validators ensure that
 * the request body contains the necessary data before it reaches the controller,
 * preventing unnecessary processing and improving security.
 */

/**
 * Validates that the request body for user authentication (signup/signin)
 * contains both an email and a password.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
const validateUserAuth = (req, res, next) => {
    // Check if either email or password is a missing from the request body.
    if (!req.body.email || !req.body.password) {
        // If data is missing, send a 400 Bad Request response with a clear error message.
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Validation failed',
            err: 'Email or password missing in the request'
        });
    }
    // If validation passes, call `next()` to pass control to the next middleware or controller.
    next();
};

/**
 * Validates that the request body for an admin check contains the user's ID.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
const validateIsAdminRequest = (req, res, next) => {
    // Check if the user ID is missing from the request body.
    if (!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User ID not provided in the request',
            message: 'Validation failed'
        });
    }
    // If validation passes, proceed to the next function in the chain.
    next();
};

// Export the validator functions to be used in the route definitions.
module.exports = {
    validateUserAuth,
    validateIsAdminRequest
};