/**
 * This file contains the controller for handling airport-related HTTP requests.
 * It is responsible for receiving incoming requests, delegating the business logic to the
 * AirportService, and sending a structured response back to the client.
 */

// Import the AirportService, which contains the business logic for airport-related operations.
const { AirportService } = require('../services/index');

// Create a single, reusable instance of the AirportService.
const airportService = new AirportService();

/**
 * Controller function to create a new airport.
 * Handles POST requests to /api/v1/airports.
 * @param {object} req - The Express request object, containing airport data in the body.
 * @param {object} res - The Express response object for sending back the response.
 */
const create = async (req, res) => {
    try {
        // Call the `create` method from the service layer, passing the request body.
        // The service layer will handle data validation and creation.
        const response = await airportService.create(req.body);
        
        // If creation is successful, send a 201 Created response with the new airport data.
        return res.status(201).json({
            message: 'Successfully created the airport',
            err: {},
            data: response,
            success: true
        });
    } catch (error) {
        // If an error occurs, log it for debugging and send a 500 Internal Server Error response.
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot create a new airport'
        });
    }
};

// Export the controller function.
module.exports = {
    create
};