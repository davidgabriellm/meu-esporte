import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddresses } from "../../hooks/addresses/useAddresses";
import { useCreateAddress } from "../../hooks/addresses/useCreateAddress";
import { useCartStore } from "../../store/cart.store";
import Stepper from "../../components/stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useCheckoutStripe } from "../../hooks/payment/useCreatePayment";

const addressSchema = z.object({
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipcode: z.string().regex(/^[0-9]{8}$/, "CEP inválido, não acrescente o hífen"),
  complement: z.string().max(80, "Máximo de 80 caracteres").optional(),
});

export default function Identificacao() {
  const { cart, getTotalPrice } = useCartStore();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  const { data: addresses } = useAddresses();
  const createAddress = useCreateAddress();

  const navigate = useNavigate();
  const createOrder = useCreateOrder();

  const checkoutStripe = useCheckoutStripe();

  async function handleContinue() {
    if (!selectedAddress) return;

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

      const orderId = orderResponse.id || orderResponse.order.id;

      const sessionData = await checkoutStripe.mutateAsync(orderId);

      if (sessionData.url) {
        window.location.href = sessionData.url;
      }
      
    } catch {
      alert("Erro ao criar pedido");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (values: any) => {
    createAddress.mutate(values, {
      onSuccess: (newAddress) => {
        setSelectedAddress(newAddress.id);
        setAddingNew(false);
        reset();
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center lg:flex-col lg:items-center lg:gap-7 lg:p-8">
      <Stepper currentStep={2} />
      <div className="flex flex-col items-center justify-center gap-7 p-4 lg:flex-row lg:items-start">
        <div className="mt-4 w-[90%] space-y-4 rounded-2xl border-2 border-gray-100 p-4 shadow">
          <h2 className="text-md font-semibold">Identificação</h2>

          <div className="space-y-3">
            {addresses?.map((a) => (
              <label
                key={a.id}
                className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-gray-100 p-3"
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === a.id}
                  onChange={() => {
                    setSelectedAddress(a.id);
                    setAddingNew(false);
                  }}
                />
                <span>{`${a.street}, ${a.number}, ${a.neighborhood}, ${a.city}`}</span>
              </label>
            ))}

            <label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-gray-100 p-3">
              <input
                type="radio"
                name="address"
                checked={addingNew}
                onChange={() => {
                  setAddingNew(true);
                  setSelectedAddress(null);
                }}
              />
              <span>Adicionar novo</span>
            </label>
          </div>

          {addingNew && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-4">
              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="Rua"
                {...register("street")}
              />
              {errors.street && (
                <p className="error">{errors.street.message}</p>
              )}

              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="Número"
                {...register("number")}
              />
              {errors.number && (
                <p className="error">{errors.number.message}</p>
              )}

              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="Bairro"
                {...register("neighborhood")}
              />
              {errors.neighborhood && (
                <p className="error">{errors.neighborhood.message}</p>
              )}

              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="Cidade"
                {...register("city")}
              />
              {errors.city && <p className="error">{errors.city.message}</p>}

              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="Estado"
                {...register("state")}
              />
              {errors.state && <p className="error">{errors.state.message}</p>}

              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="CEP"
                {...register("zipcode")}
              />
              {errors.zipcode && (
                <p className="error">{errors.zipcode.message}</p>
              )}

              <input
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-2 text-[16px] font-normal outline-none focus:border-gray-300"
                placeholder="Complemento"
                {...register("complement")}
              />
              {errors.complement && (
                <p className="error">{errors.complement.message}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-purple-600 p-3 text-white"
              >
                Salvar endereço
              </button>
            </form>
          )}

          <button
            disabled={!selectedAddress || createOrder.isPending}
            onClick={handleContinue}
            className="mt-4 w-full rounded-xl bg-purple-600 p-3 text-white disabled:opacity-40"
          >
            Continuar com o pagamento
          </button>
        </div>
        <div className="mt-4 mb-4 w-[90%] space-y-4 rounded-2xl border-2 border-gray-100 p-4 shadow">
          <h2 className="mb-6 flex text-[18px] font-semibold">Seu Pedido</h2>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex w-full justify-between">
              <h3 className="text-[15px] font-bold">Subtotal</h3>
              <span className="text-[13px]">
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
              <h3 className="text-[15px] font-bold">Transporte e Manuseio</h3>
              <span className="text-[13px]">Grátis</span>
            </div>
            <div className="flex w-full justify-between gap-5 font-light">
              <h3 className="text-[15px] font-bold">Total</h3>
              <span className="text-[13px] font-bold">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                }).format(getTotalPrice())}
              </span>
            </div>
            <div className="mt-10 flex flex-col gap-6">
              {cart.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="flex h-[86px] w-[86px] items-center justify-center object-contain"
                  />
                  <div className="flex flex-col">
                    <h3 className="line-clamp-1 text-sm font-bold">{c.name}</h3>
                    <p className="line-clamp-1 text-[12px] font-light text-gray-600">
                      {c.description}
                    </p>
                    <span className="text-[12px] font-light">{c.quantity}</span>
                    <span className="text-[13px]">
                      {" "}
                      {Intl.NumberFormat("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "BRL",
                      }).format(c.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
