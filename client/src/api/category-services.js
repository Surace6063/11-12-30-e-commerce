import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";

// get categories
export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiRequest.get("/categories/")
      return response.data;
    },
  });
