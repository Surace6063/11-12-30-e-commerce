import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

// add category  
export const useAddCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => await apiRequest.post('/categories/',data),
    onSuccess: () => queryClient.invalidateQueries(['categories']),
    onError: (error) => console.log(error)
  })
}

// delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => await apiRequest.delete(`/categories/${id}/`),
    onSuccess: () => queryClient.invalidateQueries(['categories']),
    onError: (error) => console.log(error)
  })
}


// update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, data}) => await apiRequest.patch(`/categories/${id}/`,data),
    onSuccess: () => queryClient.invalidateQueries(['categories']),
    onError: (error) => console.log(error)
  })
}