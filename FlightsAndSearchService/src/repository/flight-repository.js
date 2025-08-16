/**
 * This file contains the repository for flight-related database operations.
 * The repository layer is responsible for all direct interactions with the database.
 * It uses Sequelize models to perform CRUD (Create, Read, Update, Delete) operations,
 * abstracting the underlying database queries from the service layer.
 */

// Import the Flights model to interact with the 'flights' table in the database.
const { Flights } = require('../models/index');

// Import the `Op` (operators) object from Sequelize for creating complex queries.
const { Op } = require('sequelize');

/**
 * The FlightRepository class encapsulates all database access logic for flights.
 * It provides a clean API for the service layer to interact with the database.
 */
class FlightRepository {

    /**
     * A private helper method to create a filter object for Sequelize `findAll` queries.
     * This method dynamically builds a `where` clause based on the provided filter criteria.
     * @param {object} data - The filter criteria from the request query.
     * @returns {object} A Sequelize-compatible filter object.
     * @private
     */
    #createFilter(data) {
        let filter = {};
        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }

        // Handle price filtering by creating a range condition.
        let priceFilter = [];
        if (data.minPrice) {
            priceFilter.push({ price: { [Op.gte]: data.minPrice } }); // gte = greater than or equal to
        }
        if (data.maxPrice) {
            priceFilter.push({ price: { [Op.lte]: data.maxPrice } }); // lte = less than or equal to
        }

        // Combine price filters using AND logic.
        if (priceFilter.length > 0) {
            Object.assign(filter, { [Op.and]: priceFilter });
        }
        
        return filter;
    }

    /**
     * Creates a new flight record in the database using the provided data.
     * @param {object} data - The flight data (flightNumber, airplaneId, etc.).
     * @returns {object} The created flight object.
     */
    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    /**
     * Retrieves a specific flight by its primary key (ID).
     * @param {string} flightId - The ID of the flight.
     * @returns {object} The flight object, or null if not found.
     */
    async getFlight(flightId) {
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    /**
     * Retrieves all flights that match the given filter criteria.
     * @param {object} filter - The filter criteria (e.g., arrivalAirportId, minPrice).
     * @returns {Array} A list of matching flights.
     */
    async getAllFlights(filter) {
        try {
            const filterObject = this.#createFilter(filter);
            const flights = await Flights.findAll({
                where: filterObject
            });
            return flights;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    /**
     * Updates a flight record in the database.
     * @param {string} flightId - The ID of the flight to update.
     * @param {object} data - The data to update.
     * @returns {object} The updated flight object.
     */
    async updateFlights(flightId, data) {
        try {
            await Flights.update(data, {
                where: {
                    id: flightId
                }
            });
            // After updating, fetch and return the updated record.
            return await this.getFlight(flightId);
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }
}

module.exports = FlightRepository;