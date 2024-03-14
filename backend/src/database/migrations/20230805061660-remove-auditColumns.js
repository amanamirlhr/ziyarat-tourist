"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Lookups", "createdAt");
    await queryInterface.removeColumn("Lookups", "updatedAt");
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Lookups", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("Lookups", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
