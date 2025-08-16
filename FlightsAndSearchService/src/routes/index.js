// Import the `express` library. Even though the main `index.js` already imports it,
// it's needed here to create a new router object.
const express = require('express');

// Create a new router instance. A router in Express is like a mini-application,
// capable of having its own middleware and routing. This helps in organizing the application's routes.
const router = express.Router();

// Import the router for the v1 (version 1) of the API.
// This is a very good practice for API design. By versioning your API,
// you can make changes and add new features to a future v2 without breaking
// the applications that are currently using v1.
const v1ApiRoutes = require('./v1/index');

// Mount the `v1ApiRoutes` on the `/v1` path.
// This means that any request to a URL starting with `/api/v1` will be handled by the `v1ApiRoutes` router.
// For example, a request to `/api/v1/flights` will be passed to the flights route handler within the `v1` directory.
router.use('/v1', v1ApiRoutes);

// Export the configured router so it can be used by the main `app` object in `src/index.js`.
module.exports = router;