/**
 * This file serves as a central hub for exporting all middleware modules from this directory.
 * This pattern simplifies importing middlewares into other parts of the application,
 * such as the route definitions, by providing a single point of access.
 */
module.exports = {
    AuthRequestValidators: require('./auth-request-validators')
};