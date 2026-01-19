import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  IoMenuSharp,
  IoLogInOutline,
  IoLogOutOutline,
  IoClose,
} from "react-icons/io5";

import {
  FaUser,
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaShoppingBag,
} from "react-icons/fa";
import { useUser } from "../../hooks/useGetUser";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variants: Variants;
}

export default function RightSheet() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setOpen(false);
  };

  if (isLoading) {
    return <div className="h-10 w-10 animate-pulse rounded bg-gray-700/50" />;
  }

  const firstName = user?.name ? user.name.split(" ")[0] : "Visitante";

  const menuVariants: Variants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const itemVariants: Variants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      <button
        className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-gray-800 focus:outline-none"
        onClick={() => setOpen(true)}
      >
        <IoMenuSharp size={32} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[9998] bg-gray-900/60 backdrop-blur-sm"
              />

              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 right-0 z-[9999] flex h-full w-80 max-w-[85vw] flex-col overflow-hidden bg-white shadow-2xl"
              >
                <div className="shrink-0 border-b border-gray-200 bg-gray-100 p-6 pb-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                      Menu
                    </span>
                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-full p-1 transition-colors hover:bg-gray-200"
                    >
                      <IoClose size={24} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-blue-100 shadow-sm">
                      <FaUser className="text-xl text-blue-600" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-500">Olá,</p>
                      <p className="truncate text-lg font-bold text-gray-800">
                        {firstName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <nav>
                    <motion.ul
                      className="flex flex-col gap-2"
                      initial="closed"
                      animate="open"
                      transition={{ staggerChildren: 0.1 }}
                    >
                      <motion.li variants={itemVariants} className="mb-6">
                        {!token ? (
                          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                            <p className="mb-3 text-sm font-medium text-blue-800">
                              Acesse sua conta
                            </p>
                            <button
                              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white shadow-md transition-transform active:scale-95"
                              onClick={() => handleNavigate("/login")}
                            >
                              Entrar agora <IoLogInOutline size={20} />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="flex w-full items-center justify-between rounded-lg bg-red-50 px-4 py-3 text-red-600 transition-colors hover:bg-red-100"
                            onClick={handleLogout}
                          >
                            <span className="font-semibold">Sair da conta</span>
                            <IoLogOutOutline size={22} />
                          </button>
                        )}
                      </motion.li>

                      <hr className="mb-6 border-gray-100" />

                      <MenuItem
                        icon={<FaHome />}
                        label="Home"
                        onClick={() => handleNavigate("/")}
                        variants={itemVariants}
                      />
                      <MenuItem
                        icon={<FaBoxOpen />}
                        label="Todos os Produtos"
                        onClick={() => handleNavigate("/produtos")}
                        variants={itemVariants}
                      />
                      <MenuItem
                        icon={<FaShoppingCart />}
                        label="Carrinho"
                        onClick={() => handleNavigate("/carrinho")}
                        variants={itemVariants}
                      />

                      {token && (
                        <MenuItem
                          icon={<FaShoppingBag />}
                          label="Meus Pedidos"
                          onClick={() => handleNavigate("/pedidos")}
                          variants={itemVariants}
                        />
                      )}
                    </motion.ul>
                  </nav>
                </div>
                <div className="shrink-0 border-t border-gray-100 bg-gray-50 p-6">
                  <button
                    className="w-full rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-white hover:text-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Fechar Menu
                  </button>
                  <p className="mt-4 text-center text-xs text-gray-400">
                    © 2025 Meu Esporte
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

const MenuItem = ({ icon, label, onClick, variants }: MenuItemProps) => (
  <motion.li variants={variants}>
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-gray-600 transition-all hover:bg-gray-100 hover:text-blue-600"
    >
      <span className="text-lg text-gray-400 transition-colors group-hover:text-blue-500">
        {icon}
      </span>
      <span className="text-[16px] font-medium">{label}</span>
    </button>
  </motion.li>
);
