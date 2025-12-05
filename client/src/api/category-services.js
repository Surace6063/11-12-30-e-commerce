import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// get categories
export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/")
      return response.data;
    },
  });
