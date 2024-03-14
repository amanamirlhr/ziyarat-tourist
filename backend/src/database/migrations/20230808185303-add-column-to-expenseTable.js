"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("expenses", "tourId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tours",
        key: "tourId",
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
    await queryInterface.removeColumn("expenses", "tourId");
  },
};
