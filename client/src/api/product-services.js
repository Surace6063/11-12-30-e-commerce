import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// get products
export const useProducts = ({
    page_size = 10
}) =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/products/", {
        params: {
          page_size: page_size,
        },
      });
      return response.data;
    },
  });
