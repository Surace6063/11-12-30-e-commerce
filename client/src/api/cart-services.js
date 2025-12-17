import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiRequest.post("/carts/add/", payload)
      return res.data;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
