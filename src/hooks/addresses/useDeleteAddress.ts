import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";


async function deleteAddress(id: string) {
  await api.delete(`/addresses/${id}`);
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
