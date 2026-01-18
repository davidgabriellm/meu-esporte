import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Product } from "../interface/product";

async function fetchProduct(id: string) {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, 
  });
}
