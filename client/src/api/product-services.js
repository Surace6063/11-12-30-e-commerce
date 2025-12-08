import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// get products
export const useProducts = ({
    page_size = 10,
    category = "",
    sort="-created_at",
    minPrice="",
    maxPrice="",
    search = "",
    page = 1
}) =>
  useQuery({
    queryKey: ["products",page_size,category,sort,minPrice,maxPrice,search,page],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/products/", {
        params: {
          page_size,
          category,
          ordering: sort,
          max_price: maxPrice,
          min_price: minPrice,
          search,
          page
        }
      })
      return response.data;
    },
  });
