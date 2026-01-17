import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Address } from "../../interface/addresses";

async function fetchAddresses() {
  const response = await api.get<Address[]>("/addresses");
  return response.data;
}

export function useAddresses() {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
    enabled: !!token,   
    retry: false,
  });
}
