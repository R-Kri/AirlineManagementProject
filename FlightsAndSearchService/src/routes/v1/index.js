// Import the `express` library to create the router.
const express = require('express');

// Import the flight-specific middlewares. Middlewares are functions that have access to the request (`req`),
// the response (`res`), and the `next` function in the application's request-response cycle.
// They can execute any code, make changes to the request and the response objects, end the request-response cycle,
// and call the next middleware in the stack. This is a powerful pattern for separating concerns like validation or authentication.
const { FlightMiddlewares } = require('../../middlewares/index');

// Import the controllers for each resource (City, Flight, Airport).
// Controllers are responsible for handling the application's business logic.
// They are typically called by the router when a specific endpoint is hit.
const CityController = require('../../controllers/city-controller');
const FlightController = require('../../controllers/flight-controller');
const AirportController = require('../../controllers/airport-controller');

// Create a new router instance for the v1 API.
const router = express.Router();

// --- City Routes ---
// These routes handle all CRUD (Create, Read, Update, Delete) operations for cities.

// Route to create a new city. `POST /api/v1/city`
// When a POST request is made to this endpoint, the `create` function in the `CityController` is executed.
router.post('/city', CityController.create);

// Route to delete a city by its ID. `DELETE /api/v1/city/:id`
// The `:id` is a route parameter, which can be accessed in the controller via `req.params.id`.
router.delete('/city/:id', CityController.destroy);

// Route to get a specific city by its ID. `GET /api/v1/city/:id`
router.get('/city/:id', CityController.get);

// Route to get all cities. `GET /api/v1/city`
router.get('/city', CityController.getAll);

// Route to update a city by its ID. `PATCH /api/v1/city/:id`
// `PATCH` is typically used for partial updates, while `PUT` is used for complete replacements.
router.patch('/city/:id', CityController.update);


// --- Flight Routes ---
// These routes handle the CRUD operations for flights.

// Route to create a new flight. `POST /api/v1/flights`
// This route has a middleware, `validateCreateFlight`, which will be executed *before* the `FlightController.create` function.
// The middleware is responsible for validating the request body to ensure it contains all the necessary and correct data for creating a flight.
// If the validation fails, the middleware can send an error response and stop the request from reaching the controller.
// If it succeeds, it calls `next()` to pass control to the `FlightController.create` function.
router.post(
    '/flights', 
    FlightMiddlewares.validateCreateFlight, 
    FlightController.create
);

// Route to get all flights. `GET /api/v1/flights`
router.get('/flights', FlightController.getAll);

// Route to get a specific flight by its ID. `GET /api/v1/flights/:id`
router.get('/flights/:id', FlightController.get);

// Route to update a flight by its ID. `PATCH /api/v1/flights/:id`
router.patch('/flights/:id', FlightController.update);


// --- Airport Routes ---
// These routes handle the CRUD operations for airports.

// Route to create a new airport. `POST /api/v1/airports`
router.post('/airports', AirportController.create);


// Export the configured router to be used in `src/routes/index.js`.
module.exports = router;