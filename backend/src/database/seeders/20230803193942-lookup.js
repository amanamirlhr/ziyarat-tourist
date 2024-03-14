"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Lookups", [
      {
        Type: "gender",
        Value: "Male",
      },
      {
        Type: "gender",
        Value: "Female",
      },
      {
        Type: "gender",
        Value: "Other",
      },
      {
        Type: "role",
        Value: "admin",
      },
      {
        Type: "role",
        Value: "user",
      },
      {
        Type: "role",
        Value: "manager",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lookups", null, {});
  },
};
