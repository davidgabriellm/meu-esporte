// src/hooks/order/useCreateOrder.ts
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";

export interface OrderItemPayload {
  product_id: string;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  items: OrderItemPayload[];
  total: number;
  payment_method: string;
  address_id: string;
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: CreateOrderPayload) => {
      const token = localStorage.getItem("token");
      const response = await api.post("/orders", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      alert("Pedido criado com sucesso!");
    },
    onError: () => {
      alert("Erro ao criar pedido.");
    },
  });
}
