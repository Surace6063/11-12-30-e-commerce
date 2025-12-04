import ProductCard from "./ProductCard"
import { useProducts } from "../api/product-services"

const NewArrivals = () => {
  // fecthing product list from api
  const {data:products,isLoading,isError,error} = useProducts({
    page_size: 4
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