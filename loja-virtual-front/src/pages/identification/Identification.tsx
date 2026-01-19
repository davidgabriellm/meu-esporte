import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAddresses } from "../../hooks/addresses/useAddresses";
import { useCreateAddress } from "../../hooks/addresses/useCreateAddress";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useCheckoutStripe } from "../../hooks/payment/useCreatePayment";
import { useCartStore } from "../../store/cart.store";

import Stepper from "../../components/stepper/Stepper";
import PriceFormatter from "../../components/priceFormatter/PriceFormatter";

import { FaMapMarkerAlt, FaPlus, FaCheckCircle, FaLock } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const addressSchema = z.object({
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipcode: z.string().regex(/^[0-9]{8}$/, "CEP inválido (apenas números)"),
  complement: z.string().max(80, "Máximo de 80 caracteres").optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function Identificacao() {
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useCartStore();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const { data: addresses = [], isLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const createOrder = useCreateOrder();
  const checkoutStripe = useCheckoutStripe();

  useEffect(() => {
    if (!isLoading && addresses.length === 0) {
      setIsFormOpen(true);
    }
  }, [addresses.length, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmitAddress = (values: AddressFormData) => {
    createAddress.mutate(values, {
      onSuccess: (newAddress) => {
        setSelectedAddress(newAddress.id);
        setIsFormOpen(false);
        reset();
      },
      onError: () => {
        setGlobalError("Erro ao salvar endereço. Tente novamente.");
      },
    });
  };

  const handleGoToPayment = async () => {
    if (!selectedAddress) return;
    setGlobalError("");

    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const orderResponse = await createOrder.mutateAsync({
        items,
        total: getTotalPrice(),
        address_id: selectedAddress,
        payment_method: "stripe",
      });

      const orderId = orderResponse.id || orderResponse.order?.id;
      if (!orderId) throw new Error("ID do pedido não encontrado");

      const sessionData = await checkoutStripe.mutateAsync(orderId);

      if (sessionData.url) {
        window.location.href = sessionData.url;
      }
    } catch (err) {
      console.error(err);
      setGlobalError("Não foi possível iniciar o pagamento. Tente novamente.");
    }
  };

  const isProcessing =
    createAddress.isPending ||
    createOrder.isPending ||
    checkoutStripe.isPending;

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <Stepper currentStep={2} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <FaMapMarkerAlt className="text-blue-600" /> Endereço de Entrega
              </h2>
              {!isFormOpen && addresses.length > 0 && (
                <button
                  onClick={() => {
                    setIsFormOpen(true);
                    setSelectedAddress(null);
                  }}
                  className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                >
                  <FaPlus size={12} /> Novo Endereço
                </button>
              )}
            </div>

            {!isFormOpen && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                      selectedAddress === addr.id
                        ? "border-blue-600 bg-blue-50/30"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {selectedAddress === addr.id && (
                      <div className="absolute top-4 right-4 text-blue-600">
                        <FaCheckCircle size={20} />
                      </div>
                    )}
                    <p className="font-bold text-gray-800">
                      {addr.street}, {addr.number}
                    </p>
                    <p className="text-sm text-gray-600">{addr.neighborhood}</p>
                    <p className="text-sm text-gray-600">
                      {addr.city} - {addr.state}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      CEP: {addr.zipcode}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {isFormOpen && (
              <form
                onSubmit={handleSubmit(onSubmitAddress)}
                className="animate-fade-in rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-700">
                    Adicionar Novo Endereço
                  </h3>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Cancelar
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <input
                      {...register("street")}
                      placeholder="Rua / Avenida"
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 ${errors.street ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.street && (
                      <span className="ml-1 text-xs text-red-500">
                        {errors.street.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("number")}
                      placeholder="Número"
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white ${errors.number ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.number && (
                      <span className="ml-1 text-xs text-red-500">
                        {errors.number.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("neighborhood")}
                      placeholder="Bairro"
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white ${errors.neighborhood ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.neighborhood && (
                      <span className="ml-1 text-xs text-red-500">
                        {errors.neighborhood.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("city")}
                      placeholder="Cidade"
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white ${errors.city ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.city && (
                      <span className="ml-1 text-xs text-red-500">
                        {errors.city.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("state")}
                      placeholder="Estado (UF)"
                      maxLength={2}
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white ${errors.state ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.state && (
                      <span className="ml-1 text-xs text-red-500">
                        {errors.state.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("zipcode")}
                      placeholder="CEP (somente números)"
                      maxLength={8}
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white ${errors.zipcode ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.zipcode && (
                      <span className="ml-1 text-xs text-red-500">
                        {errors.zipcode.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("complement")}
                      placeholder="Complemento (Opcional)"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createAddress.isPending}
                  className="mt-6 w-full rounded-xl bg-gray-900 py-3 font-bold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {createAddress.isPending
                    ? "Salvando..."
                    : "Salvar e Usar este Endereço"}
                </button>
              </form>
            )}
          </div>

          <div className="relative lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Resumo do Pedido
              </h3>

              <div className="custom-scrollbar mb-4 max-h-60 space-y-3 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="h-12 w-12 flex-shrink-0 rounded bg-gray-100 p-1">
                      <img
                        src={item.image_url}
                        className="h-full w-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        qtd: {item.quantity}
                      </p>
                    </div>
                    <div className="font-semibold text-gray-800">
                      <PriceFormatter value={item.price * item.quantity} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <PriceFormatter value={getTotalPrice()} />
                </div>
                <div className="flex justify-between font-medium text-green-600">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="mt-2 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <PriceFormatter value={getTotalPrice()} />
                </div>
              </div>

              {globalError && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  <MdErrorOutline />
                  {globalError}
                </div>
              )}

              <button
                disabled={!selectedAddress || isFormOpen || isProcessing}
                onClick={handleGoToPayment}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-green-700/20 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processando...
                  </>
                ) : (
                  <>
                    <FaLock size={16} />
                    Ir para Pagamento
                  </>
                )}
              </button>

              {!selectedAddress && !isFormOpen && (
                <p className="mt-2 text-center text-xs text-red-500">
                  Selecione um endereço para continuar.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
