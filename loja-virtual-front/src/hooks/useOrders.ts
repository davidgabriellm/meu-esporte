import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Order } from "../interface/order";

async function fetchOrders(): Promise<Order[]> {
  const response = await api.get<Order[]>("/orders");
  return response.data;
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5, 
  });
}