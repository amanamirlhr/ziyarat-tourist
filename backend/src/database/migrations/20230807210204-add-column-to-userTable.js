"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "lookups",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "roleId");
  },
};
