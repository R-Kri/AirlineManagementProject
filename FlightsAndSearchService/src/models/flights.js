/**
 * This file defines the Sequelize model for a Flight.
 * This is a central model that connects airplanes and airports, representing a single flight journey.
 */
'use strict';
const {
  Model
} = require('sequelize');

/**
 * Defines the Flights model, its schema, and its various associations.
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - A reference to the Sequelize data types.
 * @returns {object} The Flights model.
 */
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations with other models.
     */
    static associate(models) {
      // A flight has one airplane. This sets up the foreign key relationship.
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplaneDetail' // Alias for when we fetch flight details with the airplane.
      });

      // A flight has a departure airport. The alias is crucial because we have two
      // associations to the same Airport model.
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        as: 'departureAirport' // Alias for the departure airport association.
      });

      // A flight has an arrival airport.
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        as: 'arrivalAirport' // Alias for the arrival airport association.
      });
    }
  }

  // Initialize the Flights model with its schema definition.
  Flights.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    departureTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0 // Price cannot be negative.
      }
    },
    boardingGate: {
      type: DataTypes.STRING
      // This can be null, as it might be assigned closer to the departure time.
    },
    totalSeats: { // This is the number of available seats for this flight.
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flights',
  });

  return Flights;
};