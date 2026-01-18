import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Address } from "../../interface/addresses";

async function createAddress(data: Omit<Address, "id">): Promise<Address> {
  const response = await api.post("/addresses", data);
  return response.data;
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
