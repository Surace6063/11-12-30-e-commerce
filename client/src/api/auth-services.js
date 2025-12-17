import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";

// sign up
export const useSignUp = () =>
  useMutation({
    mutationFn: async (data) => await apiRequest.post("/auth/register/", data),
  });

// sign in
export const useSignIn = () =>
  useMutation({
    mutationFn: async (authData) => {
      const response = await apiRequest.post("/auth/login/", authData);
      return response.data;
    }
  })
