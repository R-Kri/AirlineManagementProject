// Import the CityRepository to handle database operations for cities.
const { CityRepository } = require('../repository/index');

/**
 * The CityService class encapsulates the business logic for city-related operations.
 * In this case, the business logic is straightforward, so the service layer primarily acts as a pass-through
 * to the repository layer. However, if there were more complex rules (e.g., validation, data enrichment),
 * they would be implemented here.
 */
class CityService {
    constructor() {
        // Create an instance of the CityRepository.
        this.cityRepository = new CityRepository();
    }

    /**
     * Creates a new city.
     * @param {object} data - The city data.
     * @returns {object} The created city object.
     */
    async createCity(data) {
        try {
            const city = await this.cityRepository.createCity(data);
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    /**
     * Deletes a city.
     * @param {string} cityId - The ID of the city to delete.
     * @returns {boolean} True if the deletion was successful.
     */
    async deleteCity(cityId) {
        try {
            const response = await this.cityRepository.deleteCity(cityId);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    /**
     * Updates a city.
     * @param {string} cityId - The ID of the city to update.
     * @param {object} data - The data to update.
     * @returns {object} The updated city object.
     */
    async updateCity(cityId, data) {
        try {
            const city = await this.cityRepository.updateCity(cityId, data);
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    /**
     * Retrieves a specific city by its ID.
     * @param {string} cityId - The ID of the city.
     * @returns {object} The city object.
     */
    async getCity(cityId) {
        try {
            const city = await this.cityRepository.getCity(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }

    /**
     * Retrieves all cities, with optional filtering by name.
     * @param {object} filter - The filter criteria.
     * @returns {Array} A list of cities.
     */
    async getAllCities(filter) {
        try {
            // Here, we are specifically creating a filter object for the name.
            // This ensures that only the `name` property is used for filtering, even if other
            // query parameters are present in the request.
            const cities = await this.cityRepository.getAllCities({ name: filter.name });
            return cities;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw { error };
        }
    }
}

module.exports = CityService;