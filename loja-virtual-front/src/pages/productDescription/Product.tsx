import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/cart.store";
import PriceFormatter from "../../components/priceFormatter/PriceFormatter";
import Carousel from "../../components/carouselImage/carousel";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheckCircle,
} from "react-icons/fa";
import { MdOutlineAddShoppingCart, MdRemove, MdAdd } from "react-icons/md";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const { data: product, isLoading, error } = useProduct(id!);
  const { data: products = [] } = useProducts();

  const addToCart = useCartStore((state) => state.addToCart);

  const relatedProducts = products.filter((p) => String(p.id) !== String(id));

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < 10) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({ ...product, quantity });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderStars = (rating: number = 4.5) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-2">
        <div className="h-96 w-full animate-pulse rounded-3xl bg-gray-200" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="h-32 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Produto não encontrado.</p>
        <button
          onClick={() => navigate("/produtos")}
          className="text-blue-600 hover:underline"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-white shadow-xl backdrop-blur-md"
          >
            <FaCheckCircle className="text-green-400" />
            <span>Produto adicionado ao carrinho!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>

            <img
              src={product.image_url}
              alt={product.name}
              className="relative z-10 max-h-[400px] w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-2 text-sm font-bold tracking-wider text-blue-600 uppercase">
              Esportes / Equipamentos
            </span>

            <h1 className="mb-4 text-3xl font-black text-gray-900 lg:text-4xl">
              {product.name}
            </h1>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex text-lg">{renderStars(4.5)}</div>
              <span className="text-sm text-gray-500">(128 avaliações)</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">
                <PriceFormatter value={product.price} />
              </span>
              <p className="text-sm text-gray-500">
                Em até 12x sem juros no cartão
              </p>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {product.description ||
                "Este produto foi projetado para alta performance, garantindo durabilidade e conforto. Ideal para atletas que buscam superar seus limites."}
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center rounded-xl border border-gray-200 bg-white">
                <button
                  onClick={() => handleQuantity("dec")}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-red-500 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <MdRemove />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantity("inc")}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-600"
                >
                  <MdAdd />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-blue-600"
              >
                <MdOutlineAddShoppingCart size={24} />
                Adicionar ao Carrinho
              </motion.button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                <FaTruck className="text-orange-500" />
                <div className="text-xs">
                  <p className="font-bold text-gray-800">Frete Grátis</p>
                  <p className="text-gray-500">Para todo Brasil</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                <FaShieldAlt className="text-blue-500" />
                <div className="text-xs">
                  <p className="font-bold text-gray-800">Garantia</p>
                  <p className="text-gray-500">1 ano de fábrica</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                <FaUndo className="text-green-500" />
                <div className="text-xs">
                  <p className="font-bold text-gray-800">Devolução</p>
                  <p className="text-gray-500">30 dias grátis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Você também pode gostar
            </h3>
            <div className="ml-6 hidden h-1 flex-1 rounded-full bg-gray-200 sm:block"></div>
          </div>

          <div className="relative">
            <Carousel produtos={relatedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
