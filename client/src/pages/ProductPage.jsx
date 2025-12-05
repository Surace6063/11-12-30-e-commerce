import { useProducts } from "../api/product-services";
import CategoryFilter from "../components/filters/CategoryFilter";
import SortFilter from "../components/filters/SortFilter";
import MaxWidthContainer from "../components/MaxWidthContainer";
import ProductCard from "../components/ProductCard";

import { useState } from "react";


const ProductPage = () => {
  const [category, setCategory] = useState("")
    const [selectedSort, setSelectedSort] = useState("-created_at")

  // console.log(category);

  // fetching products
  const { data: products, isLoading, isError, error } = useProducts({category,sort:selectedSort})

  return (
    <MaxWidthContainer className="my-16">
      <div className="flex gap-10">
        {/* filter */}
        <div
          className="border border-gray-200 shadow-sm rounded-xl 
          basis-[25%] h-fit p-4"
        >
          <h1 className="text-gray-800 font-semibold mb-4 text-2xl">Filters</h1>

          {/* category filter */}
          <div>
            <h3 className="text-gray-600 font-medium mb-2">category</h3>
            <CategoryFilter category={category} setCategory={setCategory} />
          </div>

          {/* sort filter */}
          <div className="my-6">
            <h3 className="text-gray-600 font-medium mb-2">sort</h3>
             <SortFilter selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          </div>

          {/* min and max price filter */}
          <div>
             <h3 className="text-gray-600 font-medium mb-2">price range</h3>
             <p>min and max filter</p>
          </div>
          
        </div>

        {/* product list */}
        <div className="basis-[75%]">
          {/* product list header and pagination */}
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl font-semibold">Products</h1>
            <div>pagination</div>
          </div>

          {/* divider */}
          <div className="border-b border-gray-300 my-6" />

          {/* products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              "loading..."
            ) : isError ? (
              <p>{error.message}</p>
            ) : products.results.length === 0 ? (
              "No items found"
            ) : (
              products.results.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
export default ProductPage;
