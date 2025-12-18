import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { useCarts } from "../api/cart-services";
import useAuthStore from "../zustand/useAuthStore";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import AuthDialog from "../components/AuthDialog";

const CartPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { data: cart, isLoading, isError, error } = useCarts();

  if (!isAuthenticated) return <Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Plus />
    </EmptyMedia>
    <EmptyTitle>Please log in</EmptyTitle>
    <EmptyDescription>
      You need to be logged in to view your cart and continue shopping.
    </EmptyDescription>
  </EmptyHeader>

  <EmptyContent>
    <AuthDialog />
  </EmptyContent>
</Empty>

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>{error.message}</p>;

  // Default cart UI
  return (
    <MaxWidthContainer className="my-10">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-2xl bg-white">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="p-6 md:p-8 flex gap-6 hover:bg-zinc-50 transition"
              >
                <img
                  src={item.product_image}
                  alt={item.product_title}
                  className="w-28 h-28 rounded-xl object-cover border border-zinc-200"
                />

                <div className="flex-1 flex justify-between">
                  <div className="space-y-2">
                    <h2 className="font-medium text-lg text-zinc-900">
                      {item.product_title}
                    </h2>
                    <p className="text-zinc-600 font-medium">
                      ${item.product_price}
                    </p>

                    {/* Quantity */}
                    <div className="pt-3">
                      <div className="inline-flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-none text-zinc-600 hover:bg-zinc-100"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-5 text-sm text-zinc-800">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-none text-zinc-600 hover:bg-zinc-100"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <span className="font-semibold text-lg text-zinc-900">
                      ${item.total}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-zinc-700"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50 h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6 text-zinc-900">
            Order summary
          </h2>

          <div className="space-y-4 text-sm text-zinc-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cart.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping estimate</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax estimate</span>
              <span>$0.00</span>
            </div>
          </div>

          <div className="border-t border-zinc-200 mt-6 pt-6 flex justify-between font-semibold text-zinc-900">
            <span>Order total</span>
            <span>${cart?.total}</span>
          </div>

          <Button className="w-full mt-6 rounded-xl bg-zinc-900 hover:bg-zinc-800">
            Checkout
          </Button>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default CartPage;
