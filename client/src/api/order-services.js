import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../libs/apiRequest";

// fetch orders
export const useOrders = () => useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
        const response = await apiRequest.get('/orders/')
        return response.data
    }
})


// create order
export const useCreateOrder = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest.post('/orders/create/', data)
            return response.data
        }
    })
}