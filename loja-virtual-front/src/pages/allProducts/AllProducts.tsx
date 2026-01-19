import { useState } from "react";
import PriceFormatter from "../../components/priceFormatter/PriceFormatter";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interface/product";
import { useProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/cart.store";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdOutlineAddShoppingCart,
  MdSearch,
  MdErrorOutline,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const AllProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { data: products = [], isLoading } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  const searchLowerCase = search.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchLowerCase),
  );

  const onSeeDetailsClick = (productId: number | string) => {
    navigate(`/produto/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    addToCart({ ...product, quantity: 1 });

    setMessage("Produto adicionado ao carrinho!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-white shadow-xl backdrop-blur-md"
          >
            <FaCheckCircle className="text-xl text-green-400" />
            <span className="font-medium">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto mb-12 px-6">
        <div className="relative mx-auto max-w-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MdSearch className="text-2xl text-gray-400" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-2xl border-none bg-white py-4 pr-4 pl-12 text-gray-800 shadow-sm ring-1 ring-gray-200 transition-all placeholder:text-gray-400 focus:shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="O que você está procurando hoje?"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {search ? `Resultados para "${search}"` : "Todos os Produtos"}
          </h2>
          <span className="text-sm font-medium text-gray-500">
            {filteredProducts.length} itens
          </span>
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center text-center text-gray-500">
            <MdErrorOutline size={60} className="mb-4 text-gray-300" />
            <p className="text-lg font-medium">Nenhum produto encontrado.</p>
            <p className="text-sm">Tente buscar por outro termo.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
              key={product.id}
              onClick={() => onSeeDetailsClick(product.id)}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative flex h-64 w-full items-center justify-center bg-gray-50 p-6 transition-colors group-hover:bg-gray-100">
                <div className="absolute h-40 w-40 rounded-full bg-white opacity-0 blur-2xl transition-opacity group-hover:opacity-100"></div>

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="relative z-10 max-h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2">
                  <h3 className="line-clamp-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Preço</span>
                    <span className="text-xl font-bold text-gray-900">
                      <PriceFormatter value={product.price} />
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleAddToCart(e, product)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-colors hover:bg-blue-600 focus:outline-none"
                    title="Adicionar ao carrinho"
                  >
                    <MdOutlineAddShoppingCart size={22} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
