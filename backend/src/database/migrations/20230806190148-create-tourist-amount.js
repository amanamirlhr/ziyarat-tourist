"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TouristAmounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tourId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tours",
          },
          key: "tourId",
        },
      },
      currencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "currencies",
          },
          key: "currencyId",
        },
      },
      totalAmountInUsd: {
        type: Sequelize.FLOAT,
      },
      totalAmountInRupees: {
        type: Sequelize.FLOAT,
      },
      touristId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tourists",
          },
          key: "touristId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TouristAmounts");
  },
};
