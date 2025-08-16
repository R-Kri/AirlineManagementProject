// Import Sequelize's operator functionality for more complex queries.
const { Op } = require('sequelize');

// Import the City model, which represents the 'cities' table in the database.
const { City } = require('../models/index');

/**
 * The CityRepository class is responsible for all database interactions related to cities.
 * It abstracts the Sequelize queries, providing a clean interface for the service layer.
 */
class CityRepository {

    /**
     * Creates a new city in the database.
     * @param {object} data - An object containing the city's name.
     * @returns {object} The created city object.
     */
    async createCity({ name }) { // Destructuring 'name' from the input object
        try {
            // Use Sequelize's `create` method to insert a new row into the 'cities' table.
            const city = await City.create({ name });
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    /**
     * Deletes a city from the database by its ID.
     * @param {string} cityId - The ID of the city to delete.
     * @returns {boolean} True if the city was successfully deleted.
     */
    async deleteCity(cityId) {
        try {
            // Use Sequelize's `destroy` method to delete a row.
            // The `where` clause is crucial to specify which city to delete.
            await City.destroy({
                where: {
                    id: cityId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    /**
     * Updates a city's name in the database.
     * @param {string} cityId - The ID of the city to update.
     * @param {object} data - An object containing the new name.
     * @returns {object} The updated city object.
     */
    async updateCity(cityId, data) { // data is expected to be {name: "New Name"}
        try {
            // This first approach using `City.update()` is efficient but doesn't return the updated record
            // in MySQL by default. You would have to perform a separate query to get the updated data.
            // const city = await City.update(data, { where: { id: cityId } });

            // This second approach is often preferred because it returns the updated instance.
            // 1. Fetch the record from the database.
            const city = await City.findByPk(cityId);
            // 2. Update the instance's properties in memory.
            city.name = data.name;
            // 3. Save the changes back to the database.
            await city.save();
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
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
            // `findByPk` is a convenient Sequelize method for fetching a record by its primary key.
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    /**
     * Retrieves all cities, with an optional filter for the city name.
     * @param {object} filter - An object that can contain a 'name' property for filtering.
     * @returns {Array} A list of cities.
     */
    async getAllCities(filter) { // filter can be empty
        try {
            // If a 'name' filter is provided, use it to filter the results.
            if (filter.name) {
                const cities = await City.findAll({
                    where: {
                        // The `[Op.startsWith]` operator performs a 'LIKE' query (e.g., 'LIKE name%').
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return cities;
            }
            // If no filter is provided, return all cities.
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }
}

module.exports = CityRepository;
