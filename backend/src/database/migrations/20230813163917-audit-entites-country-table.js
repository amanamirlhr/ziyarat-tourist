"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("countries", "createdAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("countries", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("countries", "createdAt");
    await queryInterface.removeColumn("countries", "updatedAt");
  },
};
