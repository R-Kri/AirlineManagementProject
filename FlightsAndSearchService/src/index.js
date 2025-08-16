// Import the `express` library, which is a popular and minimalist web framework for Node.js.
// It simplifies the process of building web applications and APIs.
const express = require("express");

// Import the `body-parser` library. This is a middleware for Express.
// It parses incoming request bodies, making it easier to work with data sent from clients (e.g., from a form or a JSON payload).
const bodyParser = require("body-parser");

// Destructure the `PORT` constant from the server configuration file.
// This is a good practice as it keeps configuration separate from the main application logic, making the app more modular and easier to manage.
const { PORT } = require('./config/serverConfig');

// Import the main router for the API.
// This centralizes all the API routes, making the codebase clean and organized.
const ApiRoutes = require('./routes/index');

// Import the database configuration, which likely includes the Sequelize instance and all defined models.
// This allows the application to interact with the database.
const db = require('./models/index');

// This is a commented-out line, which might have been used for testing or debugging purposes.
// It shows how a specific model (`Airplane`) could be imported directly.
// const {Airplane} = require('./models/index');

/**
 * This is an asynchronous function that sets up and starts the Express server.
 * Using an `async` function allows for the use of `await`, which is useful for handling asynchronous operations like database connections.
 */
const setupAndStartServer = async () => {

    // Create an instance of the Express application.
    // The `app` object will be used to configure the server, define routes, and more.
    const app = express();

    // Use the `body-parser` middleware to parse incoming requests with JSON payloads.
    // This middleware will automatically parse the body of any request with a `Content-Type` of `application/json`.
    app.use(bodyParser.json());

    // Use the `body-parser` middleware to parse incoming requests with URL-encoded payloads.
    // This is often used for data submitted from HTML forms.
    // The `extended: true` option allows for rich objects and arrays to be encoded into the URL-encoded format.
    app.use(bodyParser.urlencoded({extended: true}));

    // Mount the `ApiRoutes` router on the `/api` path.
    // This means that any request to a URL starting with `/api` will be handled by this router.
    // For example, a request to `/api/flights` would be handled by the `flights` route within `ApiRoutes`.
    app.use('/api', ApiRoutes);

    // Start the server and make it listen for incoming requests on the specified `PORT`.
    // The callback function is executed once the server has successfully started.
    app.listen(PORT, async () => {
        // Log a message to the console to indicate that the server is running and on which port.
        console.log(`Server started at ${PORT}`);

        // This block checks if the `SYNC_DB` environment variable is set.
        // This is a good practice for controlling database synchronization.
        // You might only want to sync the database in a development environment, not in production.
        if(process.env.SYNC_DB) {
            // `db.sequelize.sync({alter: true})` synchronizes the database schema with the models defined in the application.
            // The `{alter: true}` option will attempt to modify existing tables to match the model definition, which can be useful during development but should be used with caution in production as it can lead to data loss.
            db.sequelize.sync({alter: true});
        }
    });
}

// Call the function to set up and start the server.
// This is the entry point that kicks off the entire application.
setupAndStartServer();
