import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 pt-10 pb-6 mt-auto">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mb-4"
        >
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-3xl font-black text-transparent">
            Meu Esporte
          </span>
        </motion.div>
        
        <p className="text-gray-400 text-sm max-w-md leading-relaxed">
          Sua loja definitiva para performance e estilo. Qualidade garantida em cada produto.
        </p>
        
        <div className="mt-8 w-full max-w-xs h-px bg-gray-800"></div>
        
        <span className="mt-6 text-gray-500 text-xs">
          © 2025 Meu Esporte. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;