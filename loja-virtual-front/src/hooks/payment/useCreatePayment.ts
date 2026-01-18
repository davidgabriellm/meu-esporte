import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

interface CheckoutSessionPayload {
  order_id: string; 
}

interface CheckoutSessionResponse {
  url: string;
}

export function useCheckoutStripe() {
  return useMutation<CheckoutSessionResponse, Error, string>({
    mutationFn: async (orderId) => {

      const { data } = await api.post<CheckoutSessionResponse>(
        "/payments/checkout-session", 
        { order_id: orderId }
      );

      return data;
    },
    onError: (error) => {
      console.error("Erro ao iniciar sessão do Stripe:", error);
      alert("Erro ao conectar com o sistema de pagamento.");
    },
  });
}