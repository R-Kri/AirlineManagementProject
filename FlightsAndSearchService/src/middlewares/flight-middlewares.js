/**
 * This file contains middleware functions for flight-related routes.
 * Middlewares are functions that execute before the main controller logic.
 * They are commonly used for tasks like request validation, authentication,
 * logging, and error handling, helping to keep the controller logic clean and focused.
 */

// Import custom error codes for creating standardized error responses.
const { ClientErrorCodes } = require('../utils/error-codes');

/**
 * Middleware to validate the request body for creating a new flight.
 * It checks for the presence of all mandatory fields before passing control
 * to the flight controller.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
const validateCreateFlight = (req, res, next) => {
    // Check if any of the required fields are missing from the request body.
    if (
        !req.body.flightNumber ||
        !req.body.airplaneId ||
        !req.body.departureAirportId ||
        !req.body.arrivalAirportId ||
        !req.body.arrivalTime ||
        !req.body.departureTime ||
        !req.body.price
    ) {
        // If any field is missing, send a 400 Bad Request response with a detailed error message.
        // This prevents invalid data from reaching the service and database layers.
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            message: 'Invalid request body for create flight',
            err: 'Missing mandatory properties to create a flight'
        });
    }

    // If validation passes, call `next()` to pass control to the next middleware or controller.
    next();
};

// Export the middleware function for use in the flight routes.
module.exports = {
    validateCreateFlight
};