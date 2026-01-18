"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("order_items", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    await queryInterface.changeColumn("order_items", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("order_items", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("order_items", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
