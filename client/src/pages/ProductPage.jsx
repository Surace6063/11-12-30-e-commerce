import { useProducts } from "@/api/product-services";
import CategoryFilter from "@/components/filters/CategoryFilter";
import SortFilter from "@/components/filters/SortFilter";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ProductCard from "@/components/ProductCard";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cn from "@/libs/cn";
import ProductSkeleton from "../components/skeleton/ProductSkeleton";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // acess value from url i.e /?category=
  // console.log(searchParams.get('category'))

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || "-created_at"
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [toggleFilter, setToggleFilter] = useState(false);

  // debounce minPrice
  const [debouncedMinPrice] = useDebounce(minPrice, 500);
  const [debouncedMaxPrice] = useDebounce(maxPrice, 500);

  // console.log(category);

  // fetching products
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts({
    category,
    sort: selectedSort,
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    search: searchValue,
    page,
  });

  // when perofrm serach opertaion from product page
  // update new serach value to serachValue state
  useEffect(() => {
    setSearchValue(searchParams.get("search"));
  }, [searchParams, searchValue]);

  // automatically set query params to url when change in filter state occurs
  useEffect(() => {
    const params = {};

    if (category) params.category = category;
    if (selectedSort) params.sort = selectedSort;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (searchValue) params.search = searchValue;
    if (page) params.page = page;
    setSearchParams(params);
  }, [
    searchParams,
    category,
    selectedSort,
    minPrice,
    maxPrice,
    searchValue,
    page,
  ]);

  const handleNext = () => {
    if (products && page < products.total_pages) {
      setPage((prev) => Number(prev) + 1);
    }
  };

  const handlePrev = () => {
    if (products && page > 1) {
      setPage((prev) => Number(prev) - 1);
    }
  };

  return (
    <MaxWidthContainer className="my-16">
      <div className="flex flex-col lg:flex-row gap-10">
        <Button
          onClick={() => setToggleFilter(!toggleFilter)}
          variant="outline"
          className="lg:hidden"
        >
          filters
        </Button>
        {/* filter */}
        <div
          className={cn(
            "border border-gray-200 shadow-sm rounded-xl basis-[25%] h-fit p-4 lg:sticky lg:top-24",
            toggleFilter ? "block" : "hidden lg:block"
          )}
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
            <SortFilter
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>

          {/* min and max price filter */}
          <div>
            <h3 className="text-gray-600 font-medium mb-2">price range</h3>
            <div className="space-y-3">
              <Input
                onChange={(e) => setMinPrice(e.target.value)}
                value={minPrice}
                type="number"
                placeholder="min price"
              />
              <Input
                onChange={(e) => setMaxPrice(e.target.value)}
                value={maxPrice}
                type="number"
                placeholder="max price"
              />
            </div>
          </div>
        </div>

        {/* product list */}
        <div className="basis-[75%]">
          {/* product list header and pagination */}
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl font-semibold">Products</h1>

            {/* pagination */}
            <div className="flex gap-3 items-center">
              <Button onClick={handlePrev} variant="outline" size="icon">
                <ChevronLeft />
              </Button>
              <div className="font-medium text-gray-600">
                <span>{products?.current_page}</span>/
                <span>{products?.total_pages}</span>
              </div>
              <Button onClick={handleNext} variant="outline" size="icon">
                <ChevronRight />
              </Button>
            </div>
          </div>

          {/* divider */}
          <div className="border-b border-gray-300 my-6" />

          {/* products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <>
                {[...Array(10)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </>
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
