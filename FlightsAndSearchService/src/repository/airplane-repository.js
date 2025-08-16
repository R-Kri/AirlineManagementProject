/**
 * This file contains the repository for airplane-related database operations.
 * It abstracts all database interactions for the Airplane model.
 */

// Import the Airplane model to interact with the 'airplanes' table.
const { Airplane } = require('../models/index');

/**
 * The AirplaneRepository class encapsulates all database access logic for airplanes.
 */
class AirplaneRepository {
    /**
     * Retrieves a specific airplane by its primary key (ID).
     * This method is used by the FlightService to get airplane details (like capacity)
     * when creating a new flight.
     * @param {string|number} id - The ID of the airplane.
     * @returns {object} The airplane object, or null if not found.
     */
    async getAirplane(id) {
        try {
            // Use Sequelize's findByPk method for an efficient primary key lookup.
            const airplane = await Airplane.findByPk(id);
            return airplane;
        } catch (error) {
            // Log and re-throw any errors for the service layer to handle.
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = AirplaneRepository;