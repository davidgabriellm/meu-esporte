import { useState, useEffect } from "react";
import { mock } from "../../../mock";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const destaques = mock.filter((item) => item.isHighlighted);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (destaques.length === 0) return;
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % destaques.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [destaques.length]);

  const trocarImagem = (novoIndex) => {
    setFade(false);
    setTimeout(() => {
      setIndex(novoIndex);
      setFade(true);
    }, 300);
  };

  if (!destaques.length)
    return <div className="p-10 text-center">Carregando ofertas...</div>;

  const produtoAtual = destaques[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-start bg-gray-50 pb-20"
    >
      <section className="mb-10 flex w-full flex-col items-center rounded-b-[3rem] bg-gradient-to-b from-gray-900 to-gray-800 pt-8 pb-12 text-white shadow-2xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-center text-3xl font-bold tracking-wide uppercase"
        >
          Destaques da Semana
        </motion.h2>

        <div className="relative flex min-h-[400px] w-[90%] max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-xl md:flex-row md:p-10 lg:w-[65%]">
          <div className="relative flex h-64 w-full items-center justify-center md:h-80 md:w-1/2">
            <div className="absolute -z-0 h-64 w-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>

            <img
              key={index}
              src={produtoAtual.image_url}
              alt={produtoAtual.product_name}
              className={`relative z-10 max-h-full w-auto transform object-contain drop-shadow-lg transition-all duration-500 ${
                fade
                  ? "translate-x-0 scale-100 opacity-100"
                  : "-translate-x-10 scale-95 opacity-0"
              }`}
            />
          </div>

          <div className="z-10 flex w-full flex-col items-start text-gray-800 md:w-1/2">
            <span className="mb-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-wider text-orange-600 uppercase">
              Oferta Especial
            </span>

            <h3
              className={`mb-2 text-2xl leading-tight font-black transition-opacity duration-300 md:text-4xl ${fade ? "opacity-100" : "opacity-50"}`}
            >
              {produtoAtual.product_name}
            </h3>

            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-sm text-gray-400">Por apenas</span>
              <span className="text-3xl font-bold text-blue-600 md:text-4xl">
                R$ {produtoAtual.product_price}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3 font-bold text-white shadow-lg shadow-gray-900/30 transition-colors hover:bg-gray-800"
            >
              <FaShoppingCart /> Comprar Agora
            </motion.button>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          {destaques.map((_, i) => (
            <button
              key={i}
              onClick={() => trocarImagem(i)}
              className={`rounded-full transition-all duration-300 ${
                index === i
                  ? "h-2 w-8 bg-orange-500"
                  : "h-2 w-2 bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-[90%] max-w-4xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm md:p-12 lg:w-[70%]"
      >
        <h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-4xl">
          Bem-vindo ao <span className="text-blue-600">Meu Esporte</span>
        </h2>

        <div className="space-y-4 text-lg leading-relaxed text-gray-600 md:text-xl">
          <p>
            O <strong>Meu Esporte</strong> é o santuário para quem vive e
            respira adrenalina! Aqui você encontra uma curadoria incrível de
            produtos esportivos, desde chuteiras de alta performance até
            equipamentos oficiais.
          </p>
          <p>
            Nossa missão é simples: oferecer{" "}
            <strong>qualidade, conforto e estilo</strong> para você dar o seu
            melhor. Navegue, escolha e prepare-se para elevar seu jogo.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <p className="flex items-center gap-2 font-medium text-gray-500">
            Explore nossa loja e encontre tudo o que precisa{" "}
            <FaArrowRight className="animate-pulse text-orange-500" />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
