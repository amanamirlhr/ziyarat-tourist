"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TourCountries", {
      tourId: {
        type: Sequelize.INTEGER,
        references: {
          model: "tours",
          key: "tourId",
        },
        onDelete: "CASCADE", // Set the desired onDelete behavior
        primaryKey: true,
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "countries",
          key: "countryId",
        },
        onDelete: "CASCADE", // Set the desired onDelete behavior
        primaryKey: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TourCountries");
  },
};
