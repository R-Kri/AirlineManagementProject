/**
 * This file contains the service layer for airport-related operations.
 * It demonstrates the use of inheritance by extending a generic CRUD service,
 * promoting code reuse and adhering to the DRY (Don't Repeat Yourself) principle.
 */

// Import the generic CrudService, which provides a reusable set of CRUD operations.
const CrudService = require('./crud-service');
// Import the AirportRepository to handle database operations for airports.
const { AirportRespository } = require('../repository/index');

/**
 * The AirportService class extends the generic CrudService.
 * This design pattern allows AirportService to inherit all standard CRUD methods
 * (create, get, getAll, update, destroy) without needing to reimplement them.
 * If any airport-specific business logic were needed, it could be added here.
 */
class AirportService extends CrudService {
    constructor() {
        // Create an instance of the AirportRepository, which handles direct database interactions for airports.
        const airportRepository = new AirportRespository();
        // Call the constructor of the parent class (CrudService) and pass the repository instance.
        // This is how the generic CrudService is configured to use the specific repository (AirportRepository)
        // for all its database operations.
        super(airportRepository);
    }
}

module.exports = AirportService;