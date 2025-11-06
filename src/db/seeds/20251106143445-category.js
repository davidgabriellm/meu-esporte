"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
     {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Bolas",
        description: "Bolas para futsal e campo",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Chuteiras",
        description: "Chuteiras society, futsal e campo (cravo)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisas",
        description: "Camisas de time e esportivas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Tênis",
        description: "Tênis esportivos e casuais",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Meias",
        description: "Meias esportivas e antiderrapantes",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
