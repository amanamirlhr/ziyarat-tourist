"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tourist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tourist.belongsTo(models.User, { foreignKey: "userId" });
      Tourist.hasMany(models.TouristAmount, { foreignKey: "touristId" });
      Tourist.belongsTo(models.Tour, { foreignKey: "tourId", as: "tours" });
    }
  }
  Tourist.init(
    {
      touristId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cnic: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tourId: DataTypes.INTEGER,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Tourist",
    }
  );
  return Tourist;
};
