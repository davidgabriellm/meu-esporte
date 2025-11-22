'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("addresses", "postalCode");
    await queryInterface.removeColumn("addresses", "is_default");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("addresses", "postalCode", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("addresses", "is_default", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  }
};
