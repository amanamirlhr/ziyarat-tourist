"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsToMany(models.Country, {
        through: models.TourCountry,
        foreignKey: "tourId",
        as: "countries_table",
      });
      Tour.hasMany(models.Tourist, { foreignKey: "tourId" });
      Tour.hasMany(models.TouristAmount, { foreignKey: "tourId" });
      Tour.hasMany(models.Expense, { foreignKey: "tourId" });
    }
  }
  Tour.init(
    {
      tourId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      CreatedById: DataTypes.INTEGER,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Tour",
    }
  );
  return Tour;
};
