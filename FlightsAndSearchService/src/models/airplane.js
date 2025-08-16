/**
 * This file defines the Sequelize model for an Airplane.
 * A model represents a table in the database and provides an abstraction layer
 * for querying and manipulating data.
 */
'use strict';
const {
  Model
} = require('sequelize');

/**
 * Defines the Airplane model, its schema, and associations.
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - A reference to the Sequelize data types.
 * @returns {object} The Airplane model.
 */
module.exports = (sequelize, DataTypes) => {
  // The Airplane class extends Sequelize's Model class, inheriting its methods.
  class Airplane extends Model {
    /**
     * Helper method for defining associations (relationships) with other models.
     * This method is automatically called by `models/index.js` after all models are loaded.
     * For example, you could define a `hasMany` relationship with Flights here.
     */
    static associate(models) {
      // define association here
    }
  }

  // Initialize the Airplane model with its schema definition.
  Airplane.init({
    // The 'modelNumber' attribute defines the model of the airplane (e.g., 'Boeing 737').
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false, // This field cannot be empty.
      validate: {
        notEmpty: true, // Ensures the string is not empty.
      }
    },
    // The 'capacity' attribute defines the total number of seats.
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 200, // Sets a default capacity if not provided.
      validate: {
        isInt: true, // Ensures the value is an integer.
        min: 50,     // Example validation: minimum capacity.
      }
    },
  }, {
    sequelize, // The Sequelize instance.
    modelName: 'Airplane', // The name of the model.
  });

  return Airplane;
};