import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Address } from "../../interface/addresses";

async function updateAddress({ id, data }: { id: string; data: Partial<Address> }) {
  const response = await api.put(`/addresses/${id}`, data);
  return response.data;
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
