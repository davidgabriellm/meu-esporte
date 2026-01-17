import logo from "../../assets/ChatGPT Image 9 de jul. de 2025, 12_08_44.png";
import RightSheet from "../buttonSheet/BottomSheet";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useUser } from "../../hooks/useGetUser";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <header className="flex h-20 w-full items-center justify-center bg-gray-900 px-6">
      <div className="flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} className="h-10 md:h-12" />
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-[18px] font-bold text-transparent md:text-[25px]">
            Meu Esporte
          </span>
        </div>

        <nav className="hidden gap-8 lg:flex">
          <button onClick={() => navigate("/")} className="text-white hover:text-blue-400 lg:cursor-pointer">Home</button>
          <button onClick={() => navigate("/produtos")} className="text-white hover:text-blue-400 lg:cursor-pointer">Todos os Produtos</button>
          <button onClick={() => navigate("/carrinho")} className="text-white hover:text-blue-400 lg:cursor-pointer">Carrinho</button>
        </nav>

        <div className="block lg:hidden">
          <RightSheet />
        </div>

        <div className="hidden items-center justify-center gap-3 lg:flex relative" ref={menuRef}>
          {isLoading ? null : user ? (
            <p
              onClick={() => setShowMenu(!showMenu)}
              className="text-white text-[16px] cursor-pointer hover:text-blue-400"
            >
              Olá, {user.name.split(" ")[0]}
            </p>
          ) : (
            <button onClick={() => navigate("/login")} className="text-white text-[16px] hover:underline cursor-pointer">
              Faça seu login
            </button>
          )}
          <FaUser color="white" />

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute top-6 right-4 bg-gray-200 text-black rounded-sm shadow-lg py-1 w-14 hover:bg-gray-300">
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer text-center text-[14px]"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
