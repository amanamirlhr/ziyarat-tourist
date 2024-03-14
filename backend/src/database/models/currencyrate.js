"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CurrencyRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CurrencyRate.belongsTo(models.Currency, { foreignKey: "currencyId" });
    }
  }
  CurrencyRate.init(
    {
      currencyId: DataTypes.INTEGER,
      iraqiRate: DataTypes.INTEGER,
      iraniRate: DataTypes.INTEGER,
      syriaRate: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CurrencyRate",
    }
  );
  return CurrencyRate;
};
