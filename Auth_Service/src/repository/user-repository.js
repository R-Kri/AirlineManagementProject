/**
 * This file defines the data access layer for User-related operations.
 * It directly interacts with the User and Role models to perform CRUD and other database actions.
 */
const { User, Role } = require('../models/index');
const ValidationError = require('../utils/validation-error');

/**
 * UserRepository class encapsulates all database logic for the User model.
 */
class UserRepository {

    /**
     * Creates a new user in the database.
     * @param {object} data - An object containing user details (e.g., email, password).
     * @returns {object} The created user object.
     * @throws {ValidationError} If Sequelize validation fails (e.g., invalid email format).
     */
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                // Wrap the Sequelize error in a custom validation error for consistent error handling.
                throw new ValidationError(error);
            }
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    /**
     * Deletes a user from the database by their ID.
     * @param {number} userId - The ID of the user to delete.
     * @returns {boolean} True if the user was deleted successfully.
     */
    async destroy(userId) {
        try {
            await User.destroy({
                where: { id: userId }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    /**
     * Retrieves a user by their primary key (ID), returning only essential attributes.
     * @param {number} userId - The ID of the user to retrieve.
     * @returns {object} The user object with 'email' and 'id' attributes.
     */
    async getById(userId) {
        try {
            // `findByPk` is a Sequelize method for fetching a record by its primary key.
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id'] // Excludes the password for security.
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    /**
     * Retrieves a user by their email address.
     * @param {string} userEmail - The email of the user to retrieve.
     * @returns {object} The full user object, including the password for authentication checks.
     */
    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({ where: { email: userEmail } });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    /**
     * Checks if a user has the 'ADMIN' role.
     * This method leverages the many-to-many relationship between Users and Roles.
     * @param {number} userId - The ID of the user to check.
     * @returns {boolean} True if the user has the 'ADMIN' role, false otherwise.
     */
    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({ where: { name: 'ADMIN' } });
            // `hasRole` is a special method added by Sequelize for many-to-many associations.
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;