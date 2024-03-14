"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("tourists", "touristId", "touristId", {
      type: Sequelize.INTEGER,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("tourists", "touristId", "touristId");
  },
};
