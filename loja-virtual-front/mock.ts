export interface Product {
  ID: number;
  product_name: string;
  product_price: number;
  image_url: string;
  description?: string;
  isHighlighted?: boolean;
}

export const mock: Product[] = [
  {
    ID: 1,
    product_name: "Bola de Socity da Nike CBF Academy 5",
    product_price: 80,
    image_url:
      "https://17889.cdn.simplo7.net/static/17889/sku/esportes-bola-nike-hj6614-100-academy-tamanho-5-campo-1754936413139.png",
    description: `A Bola Nike CBF Academy 5 foi desenvolvida para quem busca qualidade nos treinos e partidas. 
Possui construção resistente e materiais de alta durabilidade, garantindo ótima performance em diferentes gramados. 
O design oficial da seleção brasileira traz um estilo autêntico e cheio de personalidade. 
É ideal para jogadores que querem unir desempenho e paixão pelo futebol.`,
    isHighlighted: true,
  },
  {
    ID: 2,
    product_name: "Chuteira Society Mizuno Morelia",
    product_price: 120,
    image_url:
      "https://www.mundodofutebol.com.br/lojas/00057707/prod/MIZUNOPARATAS.png",
    description: `A Chuteira Mizuno Morelia Society oferece máximo conforto e precisão dentro de campo. 
Seu cabedal é confeccionado com material sintético de alta qualidade, proporcionando resistência e durabilidade. 
O solado é ideal para gramados sintéticos, garantindo tração, estabilidade e rapidez nos movimentos. 
Um modelo clássico que combina tradição e tecnologia para jogadores exigentes.`,
    isHighlighted: true,
  },
  {
    ID: 3,
    product_name: "TENIS DAY OLYMPIKUS PRETO NT 43927547-PTO",
    product_price: 130.0,
    image_url:
      "https://cdn.awsli.com.br/600x700/1621/1621592/produto/218711879/TENIS%20DAY%20OLYMPIKUS%20PRETO%20(1).png",
    description: `O Tênis Day Olympikus Preto é ideal para quem busca conforto e praticidade. 
Com design moderno, combina estilo esportivo e casual, sendo perfeito para uso urbano ou treinos leves. 
Conta com entressola que oferece amortecimento eficiente, reduzindo o impacto nos pés. 
É a escolha certa para quem quer resistência, leveza e versatilidade no dia a dia.`,
    isHighlighted: true,
  },
  {
    ID: 4,
    product_name: "Camisa do Flamengo 2019",
    product_price: 100,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/003/147/909/products/tmp_b64_173183e7-43d9-418f-a674-a6daeb5f9617_3147909_5604943-cac2a18218a6c3bef717375827586678-1024-1024.webp",
    description: `A Camisa do Flamengo 2019 é um verdadeiro clássico para os torcedores rubro-negros. 
Produzida com materiais de alta qualidade, garante conforto e durabilidade durante o uso. 
O design histórico dessa temporada marca momentos inesquecíveis do clube. 
Perfeita para colecionadores ou para quem quer vestir as cores do Mengão com orgulho.`,
    isHighlighted: true,
  },
  {
    ID: 5,
    product_name: "Camisa do Lakers",
    product_price: 70,
    image_url:
      "https://img4.dhresource.com/webp/m/0x0/f3/albu/ys/l/18/a5c50377-4dd1-48f0-922c-19b42eeb1659.png",
    description: `A Camisa do Los Angeles Lakers é essencial para os fãs do basquete americano. 
Com design moderno e oficial, representa uma das maiores franquias da NBA. 
Produzida com tecido leve e respirável, oferece conforto durante todo o uso. 
Ideal para torcedores que querem exibir seu orgulho dentro e fora das quadras.`,
    isHighlighted: true,
  },
  {
    ID: 6,
    product_name: "Camisa do Barcelona 2009",
    product_price: 95,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/003/147/909/products/tmp_b64_0f9e83f3-9753-4bdc-8ee0-4f1b3592c7f5_3147909_5604943-1e944fe5e903dd40eb17375834994935-1024-1024.webp",
    description: `A Camisa do Barcelona 2009 é um item histórico que relembra a era dourada do clube catalão. 
Produzida em tecido leve, proporciona conforto e durabilidade para torcedores e colecionadores. 
Foi nesta época que o Barça encantou o mundo com seu futebol mágico. 
Um modelo indispensável para fãs que valorizam tradição e conquistas marcantes.`,
    isHighlighted: true,
  },

  {
    ID: 9,
    product_name: "Camisa Milan Retro 2011/12 Vermelha e Preta Adidas",
    product_price: 110,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/002/183/167/products/camisa-retro-milan-2011-2012-home-1-vermelha-preta-adidas1-56d8a78a1bc5f2848d16875314728153-640-0.png",
    description: `A Camisa Retro Milan 2011/12 celebra uma das temporadas mais marcantes do clube italiano. 
Com design clássico da Adidas, combina tradição e autenticidade para os torcedores. 
Produzida em tecido confortável e respirável, pode ser usada no dia a dia ou em jogos. 
Um item obrigatório para fãs e colecionadores apaixonados pelo futebol europeu.`,
    isHighlighted: false,
  },
  {
    ID: 10,
    product_name: "Camisa Real Madrid 2025/26 Branca Adidas",
    product_price: 100,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/002/183/167/products/camisa-real-madrid-1-home-i-branca-torcedor-kit-jersey-t-shirt-white-fan-2025-2026-adidas-66b22200c1874f0cf817492213575894-640-0.png",
    description: `A Camisa Real Madrid 2025/26 une tradição e modernidade em um design exclusivo da Adidas. 
Seu tecido é leve e respirável, proporcionando conforto em qualquer situação. 
Representa a grandeza do maior clube do mundo, símbolo de conquistas e história. 
É ideal para torcedores que desejam vestir com orgulho as cores merengues.`,
    isHighlighted: false,
  },
  {
    ID: 11,
    product_name: "Meias Antiderrapantes Imantado PRO",
    product_price: 40,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/002/183/167/products/meia-antiderrapante-imantado-pro-socks-preta-e8bf028f56f5ef52ea16988484570896-640-0.png",
    description: `As Meias Antiderrapantes Imantado PRO foram criadas para oferecer mais segurança nos movimentos. 
Possuem tecnologia antiderrapante que aumenta a aderência durante treinos e jogos. 
O tecido é macio, respirável e proporciona excelente ajuste aos pés. 
São ideais para atletas que buscam conforto, estabilidade e desempenho.`,
    isHighlighted: false,
  },
  {
    ID: 12,
    product_name: "Bola de Campo da Copa do Mundo de 2010 Jabulani",
    product_price: 80,
    image_url:
      "https://static.wixstatic.com/media/c4f34d_3191701e4a4341aca38b8cb58a45668d.png/v1/fill/w_280,h_280,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c4f34d_3191701e4a4341aca38b8cb58a45668d.png",
    description: `A Bola Jabulani marcou a Copa do Mundo de 2010 na África do Sul. 
Seu design inovador chamou atenção pela aerodinâmica e estilo diferenciado. 
Construída com tecnologia avançada, foi projetada para maior precisão e controle. 
É um item histórico e indispensável para colecionadores apaixonados por futebol.`,
    isHighlighted: false,
  },
  {
    ID: 13,
    product_name: "Chuteira Umbro U01FB002015 Futebol Society Class Preto",
    product_price: 80,
    image_url:
      "https://17889.cdn.simplo7.net/static/17889/sku/homens-chuteira-umbro-u01fb002015-futebol-society-class-preto-1687552182287.png",
    description: `A Chuteira Umbro Society Class oferece resistência e conforto para jogos intensos. 
Seu cabedal é feito em material durável, proporcionando excelente ajuste aos pés. 
O solado foi desenvolvido especialmente para gramados sintéticos, garantindo tração e estabilidade. 
É uma ótima opção para jogadores que buscam custo-benefício sem abrir mão do desempenho.`,
    isHighlighted: false,
  },

  {
    ID: 15,
    product_name: "Camisa Palmeiras Puma I 23/24 - Jogador - Branco",
    product_price: 50,
    image_url:
      "https://lojapalmeiras.vtexassets.com/arquivos/ids/187108-500-auto?v=638657302214700000&width=500&height=auto&aspect=true",
    description: `A Camisa Palmeiras Puma 23/24 Jogador é feita para os torcedores mais apaixonados. 
Seu design branco transmite elegância e modernidade sem perder a tradição. 
O tecido leve proporciona conforto durante o uso em qualquer ocasião. 
É o manto perfeito para quem quer vestir com orgulho as cores do Verdão.`,
    isHighlighted: false,
  },
  {
    ID: 16,
    product_name: "Chuteira Puma Future 8 PlaY It De Society (Neymar)",
    product_price: 50,
    image_url:
      "https://cdnv2.moovin.com.br/genko/imagens/produtos/det/chuteira-puma-future-8-play-it-de-society-neymar-108378-01-279086a1e6dcdb86da21663b0f116f85.png",
    description: `A Chuteira Puma Future 8 Neymar Society oferece estilo e desempenho em alto nível. 
Com design inspirado no craque brasileiro, proporciona conforto e ajuste dinâmico. 
Seu solado foi desenvolvido para gramados sintéticos, garantindo agilidade e tração. 
Um modelo perfeito para jogadores criativos e que gostam de ousar em campo.`,
    isHighlighted: false,
  },
  {
    ID: 18,
    product_name: "Camisa PSG Home 24/25 Masculina Nike Azul e Vermelho",
    product_price: 50,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/003/147/909/products/1-93bde7e837c79c9ec317459476009220-1024-1024.png",
    description: `A Camisa PSG 24/25 é uma peça oficial da Nike que une modernidade e tradição. 
Seu design em azul e vermelho reflete a identidade única do clube francês. 
Produzida em tecido respirável, oferece conforto em jogos e no dia a dia. 
É a escolha ideal para torcedores apaixonados pelo Paris Saint-Germain.`,
    isHighlighted: false,
  },
  {
    ID: 19,
    product_name: "Camisa Inter Miami Home 2025 Messi",
    product_price: 100,
    image_url:
      "https://dcdn-us.mitiendanube.com/stores/003/315/722/products/inter-miami-home-2025-messi-1-b8c0c20fa06031922717423275236816-1024-1024.png",
    description: `A Camisa Inter Miami Home 2025 com nome e número de Messi é um item exclusivo. 
Representa a nova fase da carreira do craque argentino nos Estados Unidos. 
Produzida em tecido confortável e de alta qualidade, combina estilo e autenticidade. 
É obrigatória para fãs de Messi e colecionadores de camisas históricas.`,
    isHighlighted: false,
  },
  {
    ID: 20,
    product_name:
      "Chuteira Cristiano Ronaldo Manchester United Edição Especial",
    product_price: 140.0,
    image_url:
      "https://conteudo.imguol.com.br/blogs/169/files/2017/04/852511_001_E_PREM_native_600.png",
    description: `A Chuteira Cristiano Ronaldo Manchester United é uma edição especial de homenagem. 
Inspirada no período em que CR7 brilhou na Inglaterra, une estilo e performance. 
O design exclusivo transmite a essência de um dos maiores jogadores da história. 
Um produto raro e colecionável para fãs do português e do futebol mundial.`,
    isHighlighted: false,
  },
  {
    ID: 21,
    product_name: "Tênis de corrida Nike Zoom Fly 5 PRM - Running Land",
    product_price: 250.0,
    image_url:
      "https://magento.runningland.com.br/media/catalog/product/d/r/dr9963_001_c_prem_1__4.png?auto=webp&format=png&width=960",
    description: `O Tênis de Corrida Nike Zoom Fly 5 PRM foi projetado para oferecer velocidade com conforto em longas distâncias. Possui entressola com espuma responsiva que impulsiona cada passada. O cabedal leve e respirável garante ventilação e suporte. Ideal para corredores que buscam desempenho e estilo premium.`,
    isHighlighted: false,
  },
  {
    ID: 22,
    product_name: "Bola Futsal Penalty Rx 500 Xxii 521342 Valuti Calçados",
    product_price: 110.0,
    image_url:
      "https://cdnv2.moovin.com.br/valuti/imagens/produtos/det/bola-futsal-penalty-rx-500-xxii-521342-c692a503b592c28cf499a2f6dc681c2e.png",
    description: `A Bola de Futsal Penalty RX 500 XXII oferece excelente controle e precisão nas quadras. Desenvolvida com tecnologia que reduz o impacto e melhora o domínio, é ideal para treinos e jogos. Seu acabamento resistente garante durabilidade e ótimo desempenho. Perfeita para quem busca qualidade profissional no futsal.`,
    isHighlighted: false,
  },
  {
    ID: 23,
    product_name: "Meia Performance Poliamida 21K Azul ROYAL/VERDE Pistache Cano Longo",
    product_price: 20.0,
    image_url:
      "https://acdn-us.mitiendanube.com/stores/004/715/530/products/200-v02-u-frente-85981a36bb4e4ab79917313842126739-1024-1024.png",
    description: `A Meia Performance Poliamida 21K foi desenvolvida para oferecer conforto e suporte em treinos e corridas longas. Possui tecido respirável que ajuda na ventilação e na rápida secagem do suor. Seu cano longo proporciona proteção e ajuste firme. Ideal para atletas que buscam performance com estilo.`,
    isHighlighted: false,
  },
];
