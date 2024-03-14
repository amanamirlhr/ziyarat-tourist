"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TouristAmounts", "receivedAmountInUsd", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("TouristAmounts", "receivedAmountInRupees", {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TouristAmounts", "receivedAmountInUsd", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.removeColumn(
      "TouristAmounts",
      "receivedAmountInRupees",
      {
        type: Sequelize.FLOAT,
      }
    );
  },
};
