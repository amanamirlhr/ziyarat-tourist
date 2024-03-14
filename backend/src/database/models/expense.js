"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Currency, {
        foreignKey: "currencyId",
        as: "currencies",
      });
      Expense.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "countries",
      });
      Expense.belongsTo(models.Tour, { foreignKey: "tourId", as: "tours" });
    }
  }
  Expense.init(
    {
      item: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      quantity: DataTypes.STRING,
      description: DataTypes.STRING,
      currencyId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      tourId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
