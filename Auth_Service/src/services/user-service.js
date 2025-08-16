/**
 * This file implements the business logic for user-related operations, including authentication and authorization.
 * It acts as a bridge between the controllers and the data access layer (repository), handling all the core logic.
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');

/**
 * The UserService class encapsulates all business logic for user management.
 */
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Creates a new user after validating the input data.
     * @param {object} data - An object containing the user's email and password.
     * @returns {object} The newly created user object (excluding the password).
     * @throws {AppErrors} Throws an application-specific error if creation fails.
     */
    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw error; // Re-throw validation errors to be handled by the controller.
            }
            console.log("Something went wrong in the service layer");
            throw new AppErrors(
                'ServerError',
                'Something went wrong in the service layer',
                'Logical issue found',
                500
            );
        }
    }

    /**
     * Authenticates a user and returns a JWT upon successful sign-in.
     * @param {string} email - The user's email.
     * @param {string} plainPassword - The user's plain text password.
     * @returns {string} A JSON Web Token (JWT).
     */
    async signIn(email, plainPassword) {
        try {
            // Step 1: Fetch the user by email.
            const user = await this.userRepository.getByEmail(email);
            // Step 2: Compare the provided plain password with the stored hashed password.
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if (!passwordsMatch) {
                console.log("Password doesn't match");
                throw { error: 'Incorrect password' };
            }
            // Step 3: If passwords match, create a new JWT.
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign-in process");
            throw error;
        }
    }

    /**
     * Verifies a JWT and confirms the associated user exists.
     * @param {string} token - The JWT to authenticate.
     * @returns {boolean} True if the token is valid and the user exists.
     */
    async isAuthenticated(token) {
        try {
            // Step 1: Verify the token's signature and expiration.
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid token' };
            }
            // Step 2: Check if a user with the ID from the token still exists.
            // This prevents access for users who have been deleted after a token was issued.
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: 'No user with the corresponding token exists' };
            }
            return true;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    /**
     * Creates a JSON Web Token (JWT) with a user's details.
     * @param {object} user - The user payload (e.g., {email, id}) to encode in the token.
     * @returns {string} The generated JWT.
     */
    createToken(user) {
        try {
            // jwt.sign creates a token by signing the payload with a secret key.
            // The token is set to expire in '1d' (1 day).
            return jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    /**
     * Verifies the signature and expiration of a JWT.
     * @param {string} token - The JWT to verify.
     * @returns {object} The decoded payload of the token if verification is successful.
     */
    verifyToken(token) {
        try {
            // jwt.verify will throw an error if the token is invalid or expired.
            return jwt.verify(token, JWT_KEY);
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    /**
     * Securely compares a plain text password with a hashed password using bcrypt.
     * @param {string} userInputPlainPassword - The plain text password from the user.
     * @param {string} encryptedPassword - The hashed password from the database.
     * @returns {boolean} True if the passwords match, false otherwise.
     */
    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            // bcrypt.compareSync is designed to be slow to prevent timing attacks.
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    /**
     * Checks if a user has the 'ADMIN' role by delegating to the repository.
     * @param {string} userId - The ID of the user to check.
     * @returns {boolean} True if the user is an admin, false otherwise.
     */
    async isAdmin(userId) {
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;