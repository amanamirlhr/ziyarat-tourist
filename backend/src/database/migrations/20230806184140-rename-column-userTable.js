"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "id", "userId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "userId", "id");
  },
};
