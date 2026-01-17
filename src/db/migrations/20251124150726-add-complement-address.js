'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn("addresses", "complement", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn("addresses", "complement");
  }
};
