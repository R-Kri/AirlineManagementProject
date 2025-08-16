/**
 * This file defines the Sequelize model for a City.
 * It includes the schema and its one-to-many association with the Airport model.
 */
'use strict';
const {
  Model
} = require('sequelize');

/**
 * Defines the City model, its schema, and associations.
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - A reference to the Sequelize data types.
 * @returns {object} The City model.
 */
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations with other models.
     * This method is automatically called by `models/index.js`.
     */
    static associate(models) {
      // This defines the "one" side of a one-to-many relationship.
      // A City can have many Airports.
      this.hasMany(models.Airport, {
        // The foreignKey is the column in the 'Airports' table that links back to this 'Cities' table.
        foreignKey: 'cityId'
      });
    }
  }

  // Initialize the City model with its schema definition.
  City.init({
    // The 'name' attribute for the city's name (e.g., 'New York').
    name: {
      type: DataTypes.STRING,
      allowNull: false, // City name is required.
      unique: true,     // City names must be unique.
      validate: {
        notEmpty: true, // Ensures the string is not empty.
      }
    },
  }, {
    sequelize,
    modelName: 'City',
  });

  return City;
};