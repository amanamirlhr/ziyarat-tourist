"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Countries", [
      {
        name: "Pakistani Rupee (PKR)",
        currencyId: 1,
        isActive: true,
      },
      {
        name: "United States Dollar (USD)",
        currencyId: 2,
        isActive: true,
      },
      {
        name: "Iranian Rial (IRR)",
        currencyId: 3,
        isActive: true,
      },
      {
        name: "Iraqi Dinar (IQD)",
        currencyId: 4,
        isActive: true,
      },
      {
        name: "Syrian Pound (SYP)",
        currencyId: 5,
        isActive: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("countries");
  },
};
