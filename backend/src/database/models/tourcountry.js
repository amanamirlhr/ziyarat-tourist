"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TourCountry extends Model {
    static associate(models) {
      // define association here
    }
  }
  TourCountry.init(
    {
      tourId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tour",
          key: "tourId",
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Country",
          key: "countryId",
        },
      },
      tourRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TourCountry",
      timestamps: false,
    }
  );
  return TourCountry;
};
