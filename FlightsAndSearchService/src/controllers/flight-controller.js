/**
 * This file contains the controller for handling flight-related HTTP requests.
 * It follows the layered architecture pattern, where the controller's primary role is to manage
 * the request-response cycle and delegate the core business logic to the service layer.
 */

// Import the FlightService to handle the business logic for flights.
const { FlightService } = require('../services/index');

// Import custom success codes for creating consistent and readable response statuses.
const { SuccessCodes } = require('../utils/error-codes');

// Create a single, reusable instance of the FlightService.
const flightService = new FlightService();

/**
 * Controller function to create a new flight.
 * Handles POST requests to /api/v1/flights.
 * @param {object} req - The Express request object, containing the flight data in its body.
 * @param {object} res - The Express response object, used to send back a response.
 */
const create = async (req, res) => {
    try {
        // It's a good practice to create a separate object for the data that will be passed to the service layer.
        // This prevents any unwanted or malicious properties from the request body from being processed.
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        };

        // Call the `createFlight` method on the service layer, passing the sanitized flight data.
        // The `await` keyword pauses execution until the promise returned by `createFlight` is resolved.
        const flight = await flightService.createFlight(flightRequestData);

        // If the flight is created successfully, send a 201 Created response.
        // The response format is standardized for consistency across the API.
        return res.status(SuccessCodes.CREATED).json({
            data: flight,
            success: true,
            err: {},
            message: 'Successfully created a flight'
        });
    } catch (error) {
        // If any error occurs in the `try` block, it will be caught here.
        console.log(error); // Log the error for debugging purposes.
        // Send a 500 Internal Server Error response with a generic error message.
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create a flight',
            err: error
        });
    }
};

/**
 * Controller function to get all flights, with support for filtering.
 * Handles GET requests to /api/v1/flights.
 * @param {object} req - The Express request object, which may contain query parameters for filtering.
 * @param {object} res - The Express response object.
 */
const getAll = async (req, res) => {
    try {
        // Call the `getAllFlightData` method on the service layer, passing the query parameters from the request.
        const response = await flightService.getAllFlightData(req.query);

        // If successful, send a 200 OK response with the list of flights.
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully fetched the flights'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the flights',
            err: error
        });
    }
};

/**
 * Controller function to get a specific flight by its ID.
 * Handles GET requests to /api/v1/flights/:id.
 * @param {object} req - The Express request object, containing the flight ID as a route parameter.
 * @param {object} res - The Express response object.
 */
const get = async (req, res) => {
    try {
        // Call the `getFlight` method on the service layer, passing the flight ID from the route parameters.
        const response = await flightService.getFlight(req.params.id);

        // If successful, send a 200 OK response with the flight data.
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully fetched the flight'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the flight',
            err: error
        });
    }
};

/**
 * Controller function to update a flight's details.
 * Handles PATCH requests to /api/v1/flights/:id.
 * @param {object} req - The Express request object, containing the flight ID and the update data.
 * @param {object} res - The Express response object.
 */
const update = async (req, res) => {
    try {
        // Call the `updateFlight` method on the service layer, passing the flight ID and the update data from the request body.
        const response = await flightService.updateFlight(req.params.id, req.body);

        // If successful, send a 200 OK response with the updated flight data.
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully updated the flight'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the flight',
            err: error
        });
    }
};

// Export all the controller functions to be used in the router.
module.exports = {
    create,
    getAll,
    get,
    update
};