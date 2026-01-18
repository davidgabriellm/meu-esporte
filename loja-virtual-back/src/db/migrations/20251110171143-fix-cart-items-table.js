'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable("cartItems", "cart_items");
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.renameTable("cart_items", "cartItems");
  }
};
