"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      order_id: {
        type: Sequelize.UUID,
        references: { model: "orders", key: "id" },
        onDelete: "CASCADE",
      },
      method: { type: Sequelize.STRING },
      amount: { type: Sequelize.DECIMAL(10, 2) },
      status: { type: Sequelize.STRING, defaultValue: "pending" },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  },
};
