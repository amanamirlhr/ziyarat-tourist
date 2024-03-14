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
      touristId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tourists",
          },
          key: "touristId",
        },
      },
      receivedAmount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
