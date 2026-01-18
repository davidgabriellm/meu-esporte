import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Product } from "../interface/product";


async function fetchProducts() {
  const response = await api.get<Product[]>("/products");
  return response.data;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
