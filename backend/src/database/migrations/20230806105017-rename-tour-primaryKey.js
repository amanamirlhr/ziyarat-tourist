"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Tours", "id", "tourId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Tours", "tourId", "id");
  },
};
