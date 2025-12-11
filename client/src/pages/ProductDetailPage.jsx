import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { useParams } from "react-router-dom";
import { useProduct } from "../api/product-services";

const ProductDetailPage = () => {
    const {id} = useParams()
    const [qty, setQty] = useState(1);

  
    // fetching single product data
    const {data:product,isLoading,isError,error} = useProduct(id)


  const handleIncrease = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  if(isLoading) return <p>loading...</p>
  if(isError) return <p>{error.message}</p>

  return (
    <MaxWidthContainer className="my-8 md:my-10 lg:my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — IMAGE */}
        <div className="w-full max-h-[70vh] rounded-xl overflow-hidden">
          <img src={product.image} className="w-full h-full object-contain" />
        </div>

        {/* RIGHT — PRODUCT INFO */}
        <div>
          {/* Category */}
          <p className="text-sm text-gray-500 mb-1">{product.category_name}</p>

          <h1 className="text-4xl font-semibold text-gray-800">
            {product.title}
          </h1>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900 my-4">
            ${product.price}
          </p>

          {/* Stock */}
          <p className="text-sm text-green-600 font-medium">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

          {/* Description */}
          <div className="my-10">
            <h2 className="text-xl font-semibold mb-3">Product Details</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-4 my-6 flex-wrap">
            <Button variant="outline" size="icon" onClick={handleDecrease}>
              <Minus size={18} />
            </Button>

            <span className="font-medium text-lg">{qty}</span>

            <Button variant="outline" size="icon" onClick={handleIncrease}>
              <Plus size={18} />
            </Button>

            <Button className="flex items-center gap-2">
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <p className="text-gray-500">Coming soon…</p>
      </div>
    </MaxWidthContainer>
  );
};

export default ProductDetailPage;