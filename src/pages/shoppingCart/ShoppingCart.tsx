import PriceFormatter from "../../components/priceFormatter/PriceFormatter";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteForever, MdCancelPresentation } from "react-icons/md";
import { useCartStore } from "../../store/cart.store";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import Carousel from "../../components/carouselImage/carousel";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const {data: products = []} = useProducts()
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const navigate = useNavigate();



  const createOrder = useCreateOrder();

  if (cart.length === 0)
    return <p className="p-4 text-2xl">Seu carrinho está vazio.</p>;

  const handleCheckout = async () => {
    await createOrder.mutateAsync({
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      payment_method: "credit_card",
      total: getTotalPrice(),
    });
    clearCart();
  };

  return (
    <>
      <div className="flex-col lg:flex lg:flex-row lg:px-9 lg:py-4">
        <div className="mt-4 grid flex-1 grid-cols-1 gap-7 bg-gray-100 p-4 lg:w-3/5">
          {cart.map((c) => (
            <div
              key={c.id}
              className="relative flex flex-col gap-4 border-b-2 border-gray-200 pt-7 lg:flex-row lg:pb-7"
            >
              <button
                className="absolute top-0 left-0"
                onClick={() => removeFromCart(c.id)}
              >
                <MdCancelPresentation size={22} className="cursor-pointer" />
              </button>

              <div className="flex items-center justify-start gap-3">
                <img src={c.image_url} alt={c.name} className="w-14" />
                <div className="flex flex-col">
                  <h2 className="text-[18px] font-semibold text-gray-800">
                    {c.name}
                  </h2>
                  <p className="line-clamp-2 text-[13px] text-gray-800">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-5 lg:flex-row-reverse lg:items-center lg:gap-7">
                <PriceFormatter value={c.price} />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(c.id, Math.max(c.quantity - 1, 1))
                    }
                  >
                    <MdDeleteForever
                      className={
                        c.quantity === 1
                          ? "text-gray-300"
                          : "cursor-pointer text-red-700"
                      }
                      size={25}
                    />
                  </button>

                  <span className="text-[20px]">{c.quantity}</span>

                  <button onClick={() => updateQuantity(c.id, c.quantity + 1)}>
                    <IoMdAddCircleOutline
                      size={25}
                      className="cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between lg:hidden">
            <span className="text-2xl">Total</span>
            <span>
              <PriceFormatter value={getTotalPrice()} />
            </span>
          </div>
          <button
            onClick={() => navigate("/identificacao")}
            disabled={createOrder.isPending}
            className="mt-4 rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 lg:hidden"
          >
            {createOrder.isPending ? "Processando..." : "Continuar"}
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-start lg:gap-2.5 lg:mx-[100px] lg:my-5 lg:h-60 lg:w-[340px] lg:bg-gray-100 lg:p-3 lg:rounded-xl">
          <h2 className="mb-5 w-full text-left text-[20px] font-bold">
            Resumo
          </h2>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between gap-5 font-light">
              <h3 className="text-[15px]">subtotal</h3>
              <span className="text-[15px]">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                }).format(getTotalPrice())}
              </span>
            </div>
            <div className="flex w-full justify-between gap-5 font-light">
              <h3 className="text-[15px]">Transporte e Manuseio</h3>
              <span className="text-[15px]">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                }).format(0)}
              </span>
            </div>
            <div className="mt-2 flex w-full justify-between gap-5 font-bold">
              <h3 className="text-[15px]">Total</h3>
              <span className="text-[15px]">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                }).format(getTotalPrice())}
              </span>
            </div>
            <button className="cursor-pointer rounded-2xl bg-blue-800 p-1.5 text-[14px] text-white hover:bg-blue-900" onClick={() => navigate('/identificacao')}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-full lg:flex-col lg:items-center lg:justify-center lg:gap-4 lg:p-5 lg:py-8 lg:pb-2">
         <h3 className="flex text-left w-full font-bold text-xl mt-2">
                Você também pode gostar
              </h3>
        
              <Carousel produtos={products} />
      </div>
    </>
  );
};

export default ShoppingCart;
