/**
 * This file defines the API routes for version 1 of the authentication service.
 * It maps HTTP endpoints to specific controller functions and applies middleware for request validation.
 */

const express = require('express');

const UserController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

const router = express.Router();

// Route for user signup (creating a new user).
// POST /api/v1/signup
router.post(
    '/signup',
    // This middleware validates that the request body contains a valid email and password.
    // If validation fails, it sends an error response and the request never reaches the controller.
    AuthRequestValidators.validateUserAuth,
    // If validation passes, the request is forwarded to the `create` function in the UserController.
    UserController.create
);
// Route for user signin.
// POST /api/v1/signin
router.post(
    '/signin',
    // The same validation middleware is reused here to ensure email and password are provided.
    AuthRequestValidators.validateUserAuth,
    // If validation passes, the request is forwarded to the `signIn` function in the UserController.
    UserController.signIn
);

// Route to check if a provided token is valid.
// GET /api/v1/isAuthenticated
router.get(
    '/isAuthenticated',
    // This route is directly handled by the `isAuthenticated` function in the UserController.
    // The controller will extract the token from the request headers.
    UserController.isAuthenticated
);

// Route to check if a user has an 'ADMIN' role.
// GET /api/v1/isAdmin
router.get(
    '/isAdmin',
    // This middleware validates that the request body contains the user's ID.
    AuthRequestValidators.validateIsAdminRequest,
    // If validation passes, the request is forwarded to the `isAdmin` function in the UserController.
    UserController.isAdmin
);

module.exports = router;