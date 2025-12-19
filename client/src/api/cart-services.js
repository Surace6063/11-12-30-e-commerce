import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiRequest.post("/carts/add/", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]) // invalidate carts key.. refetch updated data after cart is added
    },
    onError: (error) => {
      console.log(error);
    },
  });
};



// remove from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest.delete(`/carts/delete/${id}/`)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]) // invalidate carts key.. refetch updated data after cart is removed
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
