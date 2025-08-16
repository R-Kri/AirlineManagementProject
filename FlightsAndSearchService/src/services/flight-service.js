/**
 * This file contains the service layer for flight-related operations.
 * The service layer is responsible for implementing the core business logic of the application.
 * It acts as an intermediary between the controller and the repository layers.
 */

// Import the repository classes. The service layer interacts with the repository layer to access the database.
const { FlightRespository, AirplaneRespository } = require('../repository/index');

// Import a helper function for comparing times.
const { compareTime } = require('../utils/helper');

/**
 * The FlightService class encapsulates all the business logic related to flights.
 */
class FlightService {

    constructor() {
        // In the constructor, we create instances of the repository classes.
        // This is a form of dependency management. For larger applications, you might use a
        // dependency injection container to manage these dependencies.
        this.airplaneRespository = new AirplaneRespository();
        this.flightrespository = new FlightRespository();
    }

    /**
     * Creates a new flight after performing business logic validations.
     * @param {object} data - The flight data.
     * @returns {object} The created flight object.
     */
    async createFlight(data) {
        try {
            // Business Logic: Validate that the arrival time is after the departure time.
            // This is a crucial piece of business logic that ensures data integrity.
            if (!compareTime(data.arrivalTime, data.departureTime)) {
                // If the validation fails, we throw a custom error object.
                // This error will be caught by the controller, which will then send an appropriate error response to the client.
                throw { error: 'Arrival time cannot be less than departure time' };
            }

            // Business Logic: Fetch the airplane details to get its total capacity.
            const airplane = await this.airplaneRespository.getAirplane(data.airplaneId);

            // Data Enrichment: Add the `totalSeats` from the airplane object to the flight data before creation.
            // This is a common pattern where the service layer enriches the data before passing it to the repository.
            const flight = await this.flightrespository.createFlight({
                ...data, totalSeats: airplane.capacity
            });

            return flight;
        } catch (error) {
            // If any error occurs (either from our validation or from the repository), we catch it.
            console.log("Something went wrong at service layer");
            // We re-throw the error to be handled by the controller.
            throw { error };
        }
    }

    /**
     * Retrieves all flights, optionally filtering them.
     * @param {object} data - Filter criteria.
     * @returns {Array} A list of flights.
     */
    async getAllFlightData(data) {
        try {
            const flights = await this.flightrespository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    /**
     * Retrieves a specific flight by its ID.
     * @param {string} flightId - The ID of the flight.
     * @returns {object} The flight object.
     */
    async getFlight(flightId) {
        try {
            const flight = await this.flightrespository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    /**
     * Updates a flight.
     * @param {string} flightId - The ID of the flight to update.
     * @param {object} data - The data to update.
     * @returns {object} The updated flight object.
     */
    async updateFlight(flightId, data) {
        try {
            const response = await this.flightrespository.updateFlights(flightId, data);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

}

// Export the FlightService class.
module.exports = FlightService;