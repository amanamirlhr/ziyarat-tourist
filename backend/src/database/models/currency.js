"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Currency.hasOne(models.Expense, { foreignKey: "currencyId" });
      Currency.hasOne(models.Country, { foreignKey: "currencyId" });
      Currency.hasMany(models.CurrencyRate, { foreignKey: "currencyId" });
      Currency.hasMany(models.TouristAmount, { foreignKey: "currencyId" });
    }
  }
  Currency.init(
    {
      currencyName: DataTypes.STRING,
      symbol: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      country: DataTypes.STRING,
      baseAmount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Currency",
    }
  );
  return Currency;
};
