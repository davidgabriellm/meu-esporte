'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("addresses", "neighborhood", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("addresses", "number", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("addresses", "zipcode", {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("addresses", "neighborhood");
    await queryInterface.removeColumn("addresses", "number");
    await queryInterface.removeColumn("addresses", "zipcode");
  }
};
