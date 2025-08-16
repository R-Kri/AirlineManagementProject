// Import the `dotenv` library. `dotenv` is a zero-dependency module that loads environment variables
// from a `.env` file into `process.env`. This is a great way to keep sensitive information like API keys,
// database passwords, and other configuration separate from your code.
const dotenv = require('dotenv');

// Call the `config()` method on the `dotenv` object. This reads the `.env` file in the root of your project,
// parses its contents, and assigns the values to `process.env`.
// For example, if your `.env` file has `PORT=3000`, then `process.env.PORT` will be `'3000'`.
dotenv.config();

// Export an object containing the configuration variables. This makes them easily accessible
// to other parts of the application. Instead of accessing `process.env` directly everywhere,
// you can import this configuration file, which provides a single source of truth for all configuration.
module.exports = {
    // Expose the `PORT` environment variable. If `PORT` is not defined in the `.env` file or as a system environment variable,
    // `process.env.PORT` will be `undefined`. It's common to provide a default value here, like `process.env.PORT || 3000`,
    // to ensure the application can always start.
    PORT: process.env.PORT
};