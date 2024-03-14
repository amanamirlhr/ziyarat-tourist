"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Currencies", [
      {
        CurrencyName: "Pakistani Rupee (PKR)",
        Country: "Pakistan",
        Symbol: "Rs",
        isActive: true,
        baseAmount: 1000,
      },
      {
        CurrencyName: "United States Dollar (USD)",
        Country: "United States",
        Symbol: "USD",
        isActive: true,
        baseAmount: 100,
      },
      {
        CurrencyName: "Iranian Rial (IRR)",
        Country: "Iran",
        Symbol: "IRR",
        isActive: true,
        baseAmount: 0,
      },
      {
        CurrencyName: "Iraqi Dinar (IQD)",
        Country: "Iraq",
        Symbol: "IQD",
        isActive: true,
        baseAmount: 0,
      },
      {
        CurrencyName: "Syrian Pound (SYP)",
        Country: "Syria",
        Symbol: "SYP",
        isActive: true,
        baseAmount: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Currency", null, {});
  },
};
