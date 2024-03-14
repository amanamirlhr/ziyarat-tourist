"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CurrencyRates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currencyId: {
        type: Sequelize.INTEGER,

        references: {
          model: {
            tableName: "Currencies",
          },
          key: "currencyId",
        },
      },
      iraqiRate: {
        type: Sequelize.INTEGER,
      },
      iraniRate: {
        type: Sequelize.INTEGER,
      },
      syriaRate: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addColumn("Currencies", "baseAmount", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CurrencyRates");
    await queryInterface.removeColumn("Currencies", "baseAmount", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
