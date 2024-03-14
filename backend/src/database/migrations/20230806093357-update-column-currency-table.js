"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "currencies",
      "CurrencyName",
      "currencyName"
    );
    await queryInterface.renameColumn("currencies", "IsActive", "isActive");
    await queryInterface.renameColumn("currencies", "Country", "country");
    await queryInterface.renameColumn("currencies", "Symbol", "symbol");
    await queryInterface.removeColumn("currencies", "createdAt");
    await queryInterface.removeColumn("currencies", "updatedAt");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "currencies",
      "currencyName",
      "CurrencyName"
    );
    await queryInterface.renameColumn("currencies", "isActive", "IsActive");
    await queryInterface.renameColumn("currencies", "country", "Country");
    await queryInterface.renameColumn("currencies", "symbol", "Symbol");
    await queryInterface.addColumn("currencies", "createdAt");
    await queryInterface.addColumn("currencies", "updatedAt");
  },
};
