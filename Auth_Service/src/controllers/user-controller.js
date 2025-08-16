/**
 * This file contains the controller logic for handling user-related HTTP requests.
 * It orchestrates the flow of data from the incoming request to the user service layer
 * and formats the final response to be sent back to the client.
 */

const UserService = require('../services/user-service');

// Create a single, reusable instance of the UserService to handle business logic.
const userService = new UserService();

/**
 * Controller for handling user registration (signup).
 * It expects an email and password in the request body.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const create = async (req, res) => {
    try {
        // Delegate the user creation logic to the user service.
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        // On success, return a 201 Created status with the new user's data.
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        // If the service layer throws an error, catch it and send a formatted error response.
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Something went wrong',
            data: {},
            success: false,
            err: error.explanation || 'An unexpected error occurred'
        });
    }
};

/**
 * Controller for handling user sign-in and issuing a JSON Web Token (JWT).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const signIn = async (req, res) => {
    try {
        // Delegate the sign-in logic to the user service.
        const response = await userService.signIn(req.body.email, req.body.password);
        // On success, return a 200 OK status with the JWT.
        return res.status(200).json({
            success: true,
            data: response, // Contains the JWT
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Something went wrong',
            data: {},
            success: false,
            err: error.explanation || 'Authentication failed'
        });
    }
};

/**
 * Controller for validating a JWT and checking if a user is authenticated.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const isAuthenticated = async (req, res) => {
    try {
        // Retrieve the token from the 'x-access-token' header.
        const token = req.headers['x-access-token'];
        // Delegate token validation to the user service.
        const response = await userService.isAuthenticated(token);
        // On success, return user details confirming authentication.
        return res.status(200).json({
            success: true,
            err: {},
            data: response, // Contains user's ID, email, and roles
            message: 'User is authenticated and token is valid'
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Something went wrong',
            data: {},
            success: false,
            err: error.explanation || 'Authentication failed'
        });
    }
};

/**
 * Controller for checking if a user has the 'ADMIN' role.
 * This is an authorization check that should be used after authentication.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const isAdmin = async(req, res) => {
    try {
        // Delegate the admin check to the user service, passing the user ID.
        const response = await userService.isAdmin(req.body.id);
        // Return a boolean indicating if the user is an admin.
        return res.status(200).json({
            data: response, // true or false
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Something went wrong',
            data: {},
            success: false,
            err: error.explanation || 'Authorization failed'
        });
    }
};

// Export all controller functions for use in the routes.
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
};