/**
 * This file defines a generic CrudRepository class providing a reusable set of CRUD operations.
 * This repository is designed to be extended by other specific repositories (e.g., AirportRepository),
 * promoting the DRY (Don't Repeat Yourself) principle and ensuring consistent database access patterns.
 * It uses Dependency Injection by accepting a Sequelize model in its constructor, making it
 * completely decoupled from any specific data model.
 */
class CrudRepository {
    /**
     * Initializes the repository with a specific Sequelize model.
     * @param {object} model - A Sequelize model that this repository will operate on.
     */
    constructor(model) {
        // The Sequelize model is injected here, making the repository generic and reusable.
        this.model = model;
    }

    /**
     * Creates a new record in the database using the injected model.
     * @param {object} data - The data for the new record.
     * @returns {object} The created record.
     */
    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log("Something went wrong in the CRUD repository");
            throw error;
        }
    }

    /**
     * Deletes a record from the database by its ID.
     * @param {string|number} modelId - The ID of the record to delete.
     * @returns {boolean} True if the deletion was successful.
     */
    async destroy(modelId) {
        try {
            await this.model.destroy({
                where: {
                    id: modelId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the CRUD repository");
            throw error;
        }
    }

    /**
     * Retrieves a record by its ID using the `findByPk` method.
     * @param {string|number} modelId - The ID of the record.
     * @returns {object} The record object, or null if not found.
     */
    async get(modelId) {
        try {
            const result = await this.model.findByPk(modelId);
            return result;
        } catch (error) {
            console.log("Something went wrong in the CRUD repository");
            throw error;
        }
    }

    /**
     * Retrieves all records from the associated table.
     * @returns {Array} A list of all records.
     */
    async getAll() {
        try {
            const result = await this.model.findAll();
            return result;
        } catch (error) {
            console.log("Something went wrong in the CRUD repository");
            throw error;
        }
    }

    /**
     * Updates a record in the database by its ID.
     * @param {string|number} modelId - The ID of the record to update.
     * @param {object} data - The data to update.
     * @returns {Array} An array containing the number of affected rows.
     */
    async update(modelId, data) {
        try {
            const result = await this.model.update(data, {
                where: {
                    id: modelId
                },
            });
            return result;
        } catch (error) {
            console.log("Something went wrong in the CRUD repository");
            throw error;
        }
    }
}

module.exports = CrudRepository;