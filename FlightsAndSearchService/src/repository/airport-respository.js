/**
 * This file contains the repository for airport-related database operations.
 * It extends a generic CRUD repository to inherit basic database functionalities.
 */

// Import the generic CrudRepository, which provides a reusable set of CRUD database operations.
const CrudRespository = require('./crud-repository');
// Import the Airport model, which represents the 'airports' table in the database.
const { Airport } = require('../models/index');

/**
 * The AirportRepository class extends the generic CrudRepository.
 * This allows it to inherit standard database operations (create, get, getAll, etc.)
 * while being configured specifically for the Airport model.
 */
class AirportRespository extends CrudRespository {
    constructor() {
        // Call the constructor of the parent class (CrudRepository) and pass the Airport model.
        // This is a key part of the inheritance pattern: it configures the generic repository
        // to work specifically with the 'airports' table.
        super(Airport);
    }
}

module.exports = AirportRespository;