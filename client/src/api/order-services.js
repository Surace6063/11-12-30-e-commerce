import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";
import useAuthStore from "../zustand/useAuthStore";

// fetch orders
export const useOrders = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await apiRequest.get("/orders/");
      return response.data;
    },
    enabled: isAuthenticated,
  });
};

// create order
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest.post("/orders/create/", data);
      return response.data;
    },
  });
};
