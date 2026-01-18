"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories;`
    );

    const getCat = (name) => categories.find((c) => c.name === name)?.id;

    await queryInterface.bulkInsert("products", [
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Bola de Socity da Nike CBF Academy 5",
        description:
          "A Bola Nike CBF Academy 5 foi desenvolvida para quem busca qualidade nos treinos e partidas. Possui construção resistente e materiais de alta durabilidade, garantindo ótima performance em diferentes gramados. O design oficial da seleção brasileira traz um estilo autêntico e cheio de personalidade. É ideal para jogadores que querem unir desempenho e paixão pelo futebol.",
        price: 80,
        stock: 50,
        image_url:
          "https://17889.cdn.simplo7.net/static/17889/sku/esportes-bola-nike-hj6614-100-academy-tamanho-5-campo-1754936413139.png",
        category_id: getCat("Bolas"),
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Chuteira Society Mizuno Morelia",
        description:
          "A Chuteira Mizuno Morelia Society oferece máximo conforto e precisão dentro de campo. Seu cabedal é confeccionado com material sintético de alta qualidade, proporcionando resistência e durabilidade. O solado é ideal para gramados sintéticos, garantindo tração, estabilidade e rapidez nos movimentos. Um modelo clássico que combina tradição e tecnologia para jogadores exigentes.",
        price: 120,
        stock: 25,
        image_url:
          "https://www.mundodofutebol.com.br/lojas/00057707/prod/MIZUNOPARATAS.png",
        category_id: getCat("Chuteiras"),
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "TENIS DAY OLYMPIKUS PRETO NT 43927547-PTO",
        description:
          "O Tênis Day Olympikus Preto é ideal para quem busca conforto e praticidade. Com design moderno, combina estilo esportivo e casual, sendo perfeito para uso urbano ou treinos leves. Conta com entressola que oferece amortecimento eficiente, reduzindo o impacto nos pés.",
        price: 130,
        stock: 80,
        image_url:
          "https://cdn.awsli.com.br/600x700/1621/1621592/produto/218711879/TENIS%20DAY%20OLYMPIKUS%20PRETO%20(1).png",
        category_id: getCat("Tênis"),
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa do Flamengo 2019",
        description:
          "A Camisa do Flamengo 2019 é um verdadeiro clássico para os torcedores rubro-negros. Produzida com materiais de alta qualidade, garante conforto e durabilidade durante o uso.",
        price: 100,
        stock: 150,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/003/147/909/products/tmp_b64_173183e7-43d9-418f-a674-a6daeb5f9617_3147909_5604943-cac2a18218a6c3bef717375827586678-1024-1024.webp",
        category_id: getCat("Camisas"),
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Camisas ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa do Lakers",
        description:
          "A Camisa do Los Angeles Lakers é essencial para os fãs do basquete americano. Produzida com tecido leve e confortável.",
        price: 70,
        stock: 150,
        image_url:
          "https://img4.dhresource.com/webp/m/0x0/f3/albu/ys/l/18/a5c50377-4dd1-48f0-922c-19b42eeb1659.png",
        category_id: getCat("Camisas"),
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa do Barcelona 2009",
        description:
          "A Camisa do Barcelona 2009 relembra uma das eras mais vitoriosas do clube. Produzida em tecido leve, proporciona conforto e durabilidade.",
        price: 95,
        stock: 150,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/003/147/909/products/tmp_b64_0f9e83f3-9753-4bdc-8ee0-4f1b3592c7f5_3147909_5604943-1e944fe5e903dd40eb17375834994935-1024-1024.webp",
        category_id: getCat("Camisas"),
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Outras Camisas ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa Milan Retro 2011/12 Vermelha e Preta",
        description:
          "A Camisa Retro Milan 2011/12 combina tradição e autenticidade para torcedores e colecionadores.",
        price: 110,
        stock: 150,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/002/183/167/products/camisa-retro-milan-2011-2012-home-1-vermelha-preta-adidas1-56d8a78a1bc5f2848d16875314728153-640-0.png",
        category_id: getCat("Camisas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa Real Madrid 2025/26 Branca Adidas",
        description:
          "A Camisa Real Madrid 2025/26 une tradição e modernidade com tecido leve e confortável.",
        price: 100,
        stock: 150,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/002/183/167/products/camisa-real-madrid-1-home-i-branca-torcedor-kit-jersey-t-shirt-white-fan-2025-2026-adidas-66b22200c1874f0cf817492213575894-640-0.png",
        category_id: getCat("Camisas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Meias ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Meias Antiderrapantes Imantado PRO",
        description:
          "Meias com tecnologia antiderrapante que oferece maior aderência e estabilidade durante jogos.",
        price: 40,
        stock: 300,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/002/183/167/products/meia-antiderrapante-imantado-pro-socks-preta-e8bf028f56f5ef52ea16988484570896-640-0.png",
        category_id: getCat("Meias"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Bola Jabulani ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Bola de Campo Jabulani Copa 2010",
        description:
          "A icônica bola da Copa do Mundo de 2010, conhecida pelo seu design aerodinâmico inovador.",
        price: 80,
        stock: 50,
        image_url:
          "https://static.wixstatic.com/media/c4f34d_3191701e4a4341aca38b8cb58a45668d.png",
        category_id: getCat("Bolas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Chuteira Umbro ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Chuteira Umbro Society Class Preto",
        description:
          "A Chuteira Umbro Society Class oferece excelente durabilidade e tração para gramados sintéticos.",
        price: 80,
        stock: 25,
        image_url:
          "https://17889.cdn.simplo7.net/static/17889/sku/homens-chuteira-umbro-u01fb002015-futebol-society-class-preto-1687552182287.png",
        category_id: getCat("Chuteiras"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Palmeiras ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa Palmeiras Puma I 23/24 Branca",
        description:
          "A Camisa Palmeiras Puma 23/24 apresenta design elegante e tecido leve para conforto durante o uso.",
        price: 50,
        stock: 150,
        image_url:
          "https://lojapalmeiras.vtexassets.com/arquivos/ids/187108-500-auto?v=638657302214700000&width=500&height=auto&aspect=true",
        category_id: getCat("Camisas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Chuteira Neymar Puma Future 8 ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Chuteira Puma Future 8 Neymar Society",
        description:
          "A Chuteira Puma Future 8 Neymar oferece ajuste dinâmico e tração ideal em gramados sintéticos.",
        price: 50,
        stock: 25,
        image_url:
          "https://cdnv2.moovin.com.br/genko/imagens/produtos/det/chuteira-puma-future-8-play-it-de-society-neymar-108378-01-279086a1e6dcdb86da21663b0f116f85.png",
        category_id: getCat("Chuteiras"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- PSG ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa PSG Home 24/25 Nike",
        description:
          "A Camisa PSG 24/25 é produzida em tecido respirável para máximo conforto e estilo.",
        price: 50,
        stock: 150,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/003/147/909/products/1-93bde7e837c79c9ec317459476009220-1024-1024.png",
        category_id: getCat("Camisas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Messi Inter Miami ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Camisa Inter Miami Home 2025 Messi",
        description:
          "Camisa oficial do Inter Miami 2025 com o nome e número do Messi, ideal para colecionadores.",
        price: 100,
        stock: 150,
        image_url:
          "https://dcdn-us.mitiendanube.com/stores/003/315/722/products/inter-miami-home-2025-messi-1-b8c0c20fa06031922717423275236816-1024-1024.png",
        category_id: getCat("Camisas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Chuteira CR7 ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Chuteira Cristiano Ronaldo Manchester United Edição Especial",
        description:
          "Modelo especial inspirado na passagem de Cristiano Ronaldo pelo Manchester United.",
        price: 140,
        stock: 25,
        image_url:
          "https://conteudo.imguol.com.br/blogs/169/files/2017/04/852511_001_E_PREM_native_600.png",
        category_id: getCat("Chuteiras"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Nike Zoom Fly ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Tênis de Corrida Nike Zoom Fly 5 PRM",
        description:
          "Tênis de corrida com entressola responsiva para impulso em longas distâncias e cabedal leve e ventilado.",
        price: 250,
        stock: 80,
        image_url:
          "https://magento.runningland.com.br/media/catalog/product/d/r/dr9963_001_c_prem_1__4.png?auto=webp&format=png&width=960",
        category_id: getCat("Tênis"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Bola Futsal Penalty ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Bola Futsal Penalty RX 500 XXII",
        description:
          "Bola de futsal com controle de impacto aprimorado e excelente precisão para jogos indoor.",
        price: 110,
        stock: 50,
        image_url:
          "https://cdnv2.moovin.com.br/valuti/imagens/produtos/det/bola-futsal-penalty-rx-500-xxii-521342-c692a503b592c28cf499a2f6dc681c2e.png",
        category_id: getCat("Bolas"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // --- Meia Performance ---
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        name: "Meia Performance Poliamida 21K Azul Royal/Verde Pistache",
        description:
          "Meia de alta performance para treino e corrida, com tecido respirável e ajuste firme.",
        price: 20,
        stock: 300,
        image_url:
          "https://acdn-us.mitiendanube.com/stores/004/715/530/products/200-v02-u-frente-85981a36bb4e4ab79917313842126739-1024-1024.png",
        category_id: getCat("Meias"),
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
