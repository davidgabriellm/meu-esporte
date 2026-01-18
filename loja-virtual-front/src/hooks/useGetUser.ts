import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

async function getUser() {
  const response = await api.get("/me");
  return response.data;
}

export function useUser() {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["user", token], 
    queryFn: getUser,
    enabled: !!token, 
    retry: false,
  });
}
