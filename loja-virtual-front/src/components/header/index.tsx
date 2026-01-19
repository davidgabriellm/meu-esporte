import logo from "../../assets/ChatGPT Image 9 de jul. de 2025, 12_08_44.png";
import RightSheet from "../buttonSheet/BottomSheet";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaShoppingBag } from "react-icons/fa";
import { useUser } from "../../hooks/useGetUser";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface User {
  name: string;
  email?: string;
}

const Header = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser() as { data: User | null; isLoading: boolean };
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
    setShowMenu(false);
  }

  const linkVariants: Variants = {
    hover: { scale: 1.05, color: "#60a5fa" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex h-20 w-full items-center justify-center bg-gray-900/95 shadow-md backdrop-blur-sm px-6 border-b border-gray-800"
    >
      <div className="flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <motion.img 
            whileHover={{ rotate: 10 }}
            src={logo} 
            className="h-10 md:h-12 object-contain" 
            alt="Logo Meu Esporte"
          />
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-xl font-extrabold tracking-tight text-transparent md:text-2xl">
            Meu Esporte
          </span>
        </div>

        <nav className="hidden gap-8 lg:flex items-center">
          {[
            { name: "Home", path: "/" },
            { name: "Produtos", path: "/produtos" },
            { name: "Carrinho", path: "/carrinho" },
          ].map((item) => (
            <motion.button
              key={item.name}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate(item.path)}
              className="text-gray-300 font-medium text-[16px] transition-colors"
            >
              {item.name}
            </motion.button>
          ))}
        </nav>

     
        <div className="block lg:hidden text-white">
          <RightSheet />
        </div>

        <div className="hidden items-center justify-center gap-4 lg:flex relative" ref={menuRef}>
          {isLoading ? (
             <div className="h-4 w-20 bg-gray-700 animate-pulse rounded"></div>
          ) : user ? (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">Bem-vindo(a),</span>
                <span className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">
                  {user.name.split(" ")[0]}
                </span>
              </div>
              <div className="bg-gray-800 p-2 rounded-full border border-gray-700 group-hover:border-blue-500 transition-colors">
                <FaUser className="text-white text-sm" />
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
            >
              Entrar
            </motion.button>
          )}

          {/* DROPDOWN */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                   <p className="text-xs text-gray-500 uppercase font-bold">Conta</p>
                </div>
                <button
                  onClick={() => navigate("/pedidos")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                >
                  <FaShoppingBag /> Meus Pedidos
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <FaSignOutAlt /> Sair
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;