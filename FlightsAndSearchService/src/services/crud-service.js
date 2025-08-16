/**
 * The CrudService class provides a generic set of CRUD (Create, Read, Update, Delete) operations.
 */
class CrudService {
    /**
     * Initializes the service with a specific repository.
     * @param {object} repository - A repository instance that implements the required data access methods.
     */
    constructor(repository) {
        // The repository is injected here, making the service generic and adaptable to any data model.
        this.repository = repository;
    }

    /**
     * Creates a new record by delegating to the repository's create method.
     * @param {object} data - The data for the new record.
     * @returns {object} The created record.
     */
    async create(data) {
        try {
            // Delegates the creation logic to the injected repository.
            const response = await this.repository.create(data);
            return response;
        } catch (error) {
            // Catches and logs any errors from the repository, then re-throws them to be handled by the controller.
            console.log("Something went wrong in the CRUD service");
            throw error;
        }
    }

    /**
     * Deletes a record by its ID using the repository's destroy method.
     * @param {string} id - The ID of the record to delete.
     * @returns {boolean} True if the deletion was successful.
     */
    async destroy(id) {
        try {
            const response = await this.repository.destroy(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in the CRUD service");
            throw error;
        }
    }

    /**
     * Retrieves a record by its ID from the repository.
     * @param {string} id - The ID of the record.
     * @returns {object} The record object.
     */
    async get(id) {
        try {
            const response = await this.repository.get(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in the CRUD service");
            throw error;
        }
    }

    /**
     * Retrieves all records from the repository.
     * @returns {Array} A list of all records.
     */
    async getAll() {
        try {
            const response = await this.repository.getAll();
            return response;
        } catch (error) {
            console.log("Something went wrong in the CRUD service");
            throw error;
        }
    }

    /**
     * Updates a record by its ID.
     * @param {string} id - The ID of the record to update.
     * @param {object} data - The data to update.
     * @returns {object} The updated record.
     */
    async update(id, data) {
        try {
            const response = await this.repository.update(id, data);
            return response;
        } catch (error) {
            console.log("Something went wrong in the CRUD service");
            throw error;
        }
    }
}

module.exports = CrudService;