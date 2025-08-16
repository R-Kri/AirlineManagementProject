// Import the CityService, which contains the business logic for city-related operations.
const { CityService } = require('../services/index');

// Create an instance of the CityService. This single instance will be used by all the controller functions.
const cityService = new CityService();

/**
 * Controller function to create a new city.
 * Handles POST requests to /api/v1/city.
 */
const create = async (req, res) => {
    try {
        // Call the `createCity` method from the service layer, passing the request body.
        const city = await cityService.createCity(req.body);
        // Send a 201 Created response with the newly created city data.
        return res.status(201).json({
            data: city,
            success: true,
            message: 'Successfully created a city',
            err: {}
        });
    } catch (error) {
        // If an error occurs, log it and send a 500 Internal Server Error response.
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create a city',
            err: error
        });
    }
};

/**
 * Controller function to delete a city.
 * Handles DELETE requests to /api/v1/city/:id.
 */
const destroy = async (req, res) => {
    try {
        // Call the `deleteCity` method from the service layer, passing the city ID from the route parameters.
        const response = await cityService.deleteCity(req.params.id);
        // Send a 200 OK response indicating success.
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully deleted a city',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to delete the city',
            err: error
        });
    }
};

/**
 * Controller function to get a specific city by its ID.
 * Handles GET requests to /api/v1/city/:id.
 */
const get = async (req, res) => {
    try {
        // Call the `getCity` method from the service layer.
        const response = await cityService.getCity(req.params.id);
        // Send a 200 OK response with the city data.
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a city',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to get the city',
            err: error
        });
    }
};

/**
 * Controller function to update a city.
 * Handles PATCH requests to /api/v1/city/:id.
 */
const update = async (req, res) => {
    try {
        // Call the `updateCity` method from the service layer.
        const response = await cityService.updateCity(req.params.id, req.body);
        // Send a 200 OK response with the updated city data.
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a city',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the city',
            err: error
        });
    }
};

/**
 * Controller function to get all cities.
 * Handles GET requests to /api/v1/city.
 * Supports filtering via query parameters.
 */
const getAll = async (req, res) => {
    try {
        // Call the `getAllCities` method from the service layer.
        const cities = await cityService.getAllCities(req.query);
        // Send a 200 OK response with the list of cities.
        return res.status(200).json({
            data: cities,
            success: true,
            message: 'Successfully fetched all cities',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the cities',
            err: error
        });
    }
};

// Export all the controller functions.
module.exports = {
    create,
    destroy,
    get,
    update,
    getAll
};