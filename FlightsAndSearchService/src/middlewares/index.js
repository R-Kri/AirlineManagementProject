/**
 * This index.js file serves as a central hub for exporting all middleware modules
 * from this directory. This pattern simplifies imports in other parts of the application,
 * allowing them to import all middlewares from a single source rather than from
 * multiple individual files.
 */

module.exports = {
    // Export all flight-related middlewares under the FlightMiddlewares namespace.
    FlightMiddlewares: require('./flight-middlewares')
};