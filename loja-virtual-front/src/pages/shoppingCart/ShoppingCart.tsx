import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cart.store";
import { useProducts } from "../../hooks/useProducts";
import PriceFormatter from "../../components/priceFormatter/PriceFormatter";
import Carousel from "../../components/carouselImage/carousel";
import { motion, AnimatePresence } from "framer-motion";


import { MdDeleteOutline, MdRemove, MdAdd, MdArrowForward } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();
  const shippingCost = 0;
  const finalTotal = totalPrice + shippingCost;

  
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
          <IoBagHandleOutline size={48} className="text-gray-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Seu carrinho está vazio</h2>
          <p className="mt-2 text-gray-500">Parece que você ainda não adicionou nenhum item.</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Começar a comprar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Seu Carrinho</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="relative flex flex-col gap-4 border-b border-gray-100 p-6 last:border-0 sm:flex-row sm:items-center"
                  >
              
                    <div className="flex shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2 h-24 w-24">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>

                
                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      <div className="mt-2 text-lg font-bold text-blue-600">
                        <PriceFormatter value={item.price} />
                      </div>
                    </div>

                   
                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-4">
                      
            
                      <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <MdRemove />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                        >
                          <MdAdd />
                        </button>
                      </div>

                  
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <MdDeleteOutline size={18} />
                        <span className="hidden sm:inline">Remover</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

         
          <div className="relative h-fit lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Resumo do Pedido</h2>
              
              <div className="flex flex-col gap-4 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <PriceFormatter value={totalPrice} />
                </div>
                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>Frete</span>
                    <FaTruck className="text-gray-400 text-xs" />
                  </div>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  <PriceFormatter value={finalTotal} />
                </span>
              </div>

              <button
                onClick={() => navigate("/identificacao")}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
              >
                Continuar Compra
                <MdArrowForward className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaTruck /> Entrega segura para todo Brasil
              </div>
            </div>
          </div>

        </div>
        <div className="mt-20 border-t border-gray-200 pt-10">
          <h3 className="mb-6 text-2xl font-bold text-gray-800">
            Aproveite e leve também
          </h3>
          <Carousel produtos={products} />
        </div>
        
      </div>
    </div>
  );
};

export default ShoppingCart;