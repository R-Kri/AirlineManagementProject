/**
 * This file defines the Sequelize model for an Airport.
 * It includes the schema definition and its association with the City model.
 */
'use strict';
const {
  Model
} = require('sequelize');

/**
 * Defines the Airport model, its schema, and associations.
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - A reference to the Sequelize data types.
 * @returns {object} The Airport model.
 */
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations with other models.
     * This method is automatically called by `models/index.js`.
     */
    static associate(models) {
      // This defines a many-to-one relationship: an Airport belongs to one City,
      // and a City can have many Airports.
      this.belongsTo(models.City, {
        foreignKey: 'cityId', // The foreign key in the 'Airports' table.
        onDelete: 'CASCADE',  // If a city is deleted, its airports are also deleted.
        as: 'city'            // Optional alias for the association.
      });
    }
  }

  // Initialize the Airport model with its schema definition.
  Airport.init({
    // The 'name' attribute for the airport's name (e.g., 'JFK International Airport').
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Airport names should be unique.
      validate: {
        notEmpty: true,
      }
    },
    // The 'address' attribute for the airport's physical address.
    address: {
      type: DataTypes.STRING,
      // Address can be optional.
    },
    // The 'cityId' attribute, which is a foreign key linking to the 'Cities' table.
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Every airport must belong to a city.
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });

  return Airport;
};