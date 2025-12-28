import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
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


// add product  
export const useAddProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => await apiRequest.post('/products/',data),
    onSuccess: () => queryClient.invalidateQueries(['products']),
    onError: (error) => console.log(error)
  })
}

// delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => await apiRequest.delete(`/products/${id}/`),
    onSuccess: () => queryClient.invalidateQueries(['products']),
    onError: (error) => console.log(error)
  })
}


// update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, data}) => await apiRequest.patch(`/products/${id}/`,data),
    onSuccess: () => queryClient.invalidateQueries(['products']),
    onError: (error) => console.log(error)
  })
}  