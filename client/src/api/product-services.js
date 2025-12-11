import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";

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
      const response = await apiRequest.get("/products/", {
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


// get single product  

export const useProduct = (id) =>
  useQuery({
    queryKey: ["product",id],
    queryFn: async () => {
      const response = await apiRequest.get(`/products/${id}/`)
      return response.data;
    },
  });
