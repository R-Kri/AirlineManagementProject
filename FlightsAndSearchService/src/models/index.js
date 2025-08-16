/**
 * This file is the entry point for all Sequelize models. It serves three main purposes:
 * 1. Initializes the Sequelize database connection based on the environment configuration.
 * 2. Dynamically reads and imports all other model files in this directory.
 * 3. Sets up the associations (relationships) between the models after they are all loaded.
 * This setup allows for a clean and scalable way to manage database models and their interactions.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {}; // This object will hold all the models.

let sequelize;
// Establish the database connection.
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically load all model files from the current directory.
fs
  .readdirSync(__dirname)
  .filter(file => {
    // The filter ensures we only process valid JavaScript model files,
    // excluding this index file, hidden files, and non-JS files.
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // Import each model file and initialize it with the sequelize connection.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Add the initialized model to the `db` object, making it accessible via `db.ModelName`.
    db[model.name] = model;
  });

// Set up model associations.
// This loop iterates over all the loaded models and calls their `associate` method, if it exists.
// This is a crucial step that builds the relationships (e.g., hasMany, belongsTo) between tables.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the `db` object, which now contains the configured Sequelize instance and all the models.
// This object is the primary interface for the rest of the application to interact with the database.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
