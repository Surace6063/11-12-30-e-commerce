import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";
import useAuthStore from "../zustand/useAuthStore";

// fetch user cart
export const useCarts = () => {
  const {isAuthenticated} = useAuthStore()

  return useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const res = await apiRequest.get("/carts/");
      return res.data;
    },
    enabled: isAuthenticated, // only fetch user cart, when user is authenticated
  });
};

// add to cart
export const useAddToCart = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiRequest.post("/carts/add/", payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
