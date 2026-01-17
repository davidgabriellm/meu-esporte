import { useState, useEffect } from "react";
import { mock } from "../../../mock"; // Ajuste o caminho conforme necessário
import { motion } from "framer-motion"; // Animações de entrada
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const destaques = mock.filter((item) => item.isHighlighted);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Lógica original mantida
  useEffect(() => {
    if (destaques.length === 0) return;
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % destaques.length);
    }, 4000); // Aumentei um pouco para dar tempo de ler

    return () => clearInterval(intervalo);
  }, [destaques.length]);

  const trocarImagem = (novoIndex) => {
    setFade(false);
    setTimeout(() => {
      setIndex(novoIndex);
      setFade(true);
    }, 300);
  };

  // Se não houver destaques, evitamos erro
  if (!destaques.length) return <div className="p-10 text-center">Carregando ofertas...</div>;

  const produtoAtual = destaques[index];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-start bg-gray-50 pb-20"
    >
      
      {/* --- HERO SECTION / DESTAQUES --- */}
      <section className="w-full flex flex-col items-center pt-8 pb-12 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-b-[3rem] shadow-2xl mb-10">
        
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-3xl font-bold tracking-wide uppercase text-center"
        >
          Destaques da Semana
        </motion.h2>

        {/* CARD DO PRODUTO */}
        <div className="relative w-[90%] lg:w-[65%] max-w-5xl bg-white rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 min-h-[400px]">
          
          {/* Imagem com Container */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative h-64 md:h-80">
            {/* Círculo decorativo de fundo */}
            <div className="absolute w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl -z-0"></div>
            
            <img
              key={index}
              src={produtoAtual.image_url}
              alt={produtoAtual.product_name}
              className={`relative z-10 max-h-full w-auto object-contain drop-shadow-lg transition-all duration-500 transform ${
                fade ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-10"
              }`}
            />
          </div>

          {/* Informações do Produto (Lado direito no Desktop) */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-gray-800 z-10">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Oferta Especial
            </span>
            
            <h3 className={`text-2xl md:text-4xl font-black mb-2 leading-tight transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-50'}`}>
              {produtoAtual.product_name}
            </h3>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-sm text-gray-400">Por apenas</span>
              <span className="text-3xl md:text-4xl font-bold text-blue-600">
                R$ {produtoAtual.product_price}
              </span>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/30"
            >
              <FaShoppingCart /> Comprar Agora
            </motion.button>
          </div>
        </div>

        {/* CONTROLES DO SLIDE (BOLINHAS) */}
        <div className="mt-8 flex gap-3">
          {destaques.map((_, i) => (
            <button
              key={i}
              onClick={() => trocarImagem(i)}
              className={`transition-all duration-300 rounded-full ${
                index === i 
                  ? "w-8 h-2 bg-orange-500" 
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- TEXTO INSTITUCIONAL --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-[90%] lg:w-[70%] max-w-4xl bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center"
      >
        <h2 className="mb-6 text-3xl md:text-4xl font-extrabold text-gray-900">
          Bem-vindo ao <span className="text-blue-600">Meu Esporte</span>
        </h2>
        
        <div className="space-y-4 text-gray-600 text-lg leading-relaxed md:text-xl">
          <p>
            O <strong>Meu Esporte</strong> é o santuário para quem vive e respira adrenalina! 
            Aqui você encontra uma curadoria incrível de produtos esportivos, 
            desde chuteiras de alta performance até equipamentos oficiais.
          </p>
          <p>
            Nossa missão é simples: oferecer <strong>qualidade, conforto e estilo</strong> para 
            você dar o seu melhor. Navegue, escolha e prepare-se para elevar seu jogo.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
           <p className="text-gray-500 font-medium flex items-center gap-2">
             Explore nossa loja e encontre tudo o que precisa <FaArrowRight className="text-orange-500 animate-pulse"/>
           </p>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Home;