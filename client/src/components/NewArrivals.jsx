import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ProductCard from "./ProductCard"

const NewArrivals = () => {
  // fecthing product list from api
  const {data:products,isLoading,isError,error} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/products/',{
        params:{
          page_size: 4
        }
      })
      return response.data
    }
  })

  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        isLoading ? "loading..." :
        isError ? <p>{error.message}</p> :
        products.results.length === 0 ? "No items found" :
        products.results.map(item => (
          <ProductCard key={item.id} item={item} />
        ))
      }
    </div>
  )
}
export default NewArrivals