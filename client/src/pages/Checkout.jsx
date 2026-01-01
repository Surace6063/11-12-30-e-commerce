import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { ChevronsLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/validation/checkout-validation";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/zustand/useAuthStore";
import { useCarts } from "@/api/cart-services";
import { useCreateOrder } from "../api/order-services";
import toast from "react-hot-toast"
import {Spinner} from "@/components/ui/spinner"

const Checkout = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <p>please login in first</p>;

  // fetching cart items
  const { data: cart, isLoading, isError, error } = useCarts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  //  hook to create order
  const {mutate,isPending} = useCreateOrder()


  const onSubmit = (data) => {
    // formatting cart items data
    const items = cart?.items?.map((item) => ({
      product: item.product, // product id
      quantity: item.quantity,
    }))

    const payload = {
      ...data,
      items
    }

    mutate(payload,{
      onSuccess: () => {
        toast.success("Order Placed sucessfully.")
        if(data.payment_method === 'cod'){
          navigate('/orders')
        }
      }
    })

  }

  return (
    <MaxWidthContainer className="my-6 max-w-6xl">
      <Button
        onClick={() => navigate("/carts")}
        className="mb-6 text-gray-700 font-semibold"
        variant="ghost"
      >
        <ChevronsLeft />
        back
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2">
            <div className="space-y-6 pt-6">
              {/* General Information */}
              <section className="space-y-4">
                <h2 className="font-bold text-xl text-gray-800">
                  1. General Information
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Full Name *"
                    placeholder="eg: John Doe"
                    {...register("full_name")}
                    error={errors?.full_name?.message}
                  />

                  <Input
                    label="Email *"
                    placeholder="eg: john@gmail.com"
                    {...register("email")}
                    error={errors?.email?.message}
                  />
                </div>

                <Input
                  label="Phone Number *"
                  placeholder="eg: 9800000011"
                  {...register("phone_number")}
                  error={errors?.phone_number?.message}
                />
              </section>

              {/* Company Info */}
              <section className="space-y-4">
                <h2 className="font-bold text-xl text-gray-800">
                  2. Company Information
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Company Name"
                    placeholder="Abc Pvt Ltd"
                    {...register("company_name")}
                  />
                  <Input
                    label="PAN/VAT Number"
                    placeholder="12XXXXXX"
                    {...register("pan_number")}
                  />
                </div>
              </section>

              {/* Delivery Address */}
              <section className="space-y-4">
                <h2 className="font-bold text-xl text-gray-800">
                  3. Delivery Address
                </h2>

                <Input
                  label="City / District *"
                  placeholder="eg: Kathmandu"
                  {...register("city")}
                  error={errors?.city?.message}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Address *"
                    placeholder="eg: jamal,kathmandu"
                    {...register("address")}
                    error={errors?.address?.message}
                  />

                  <Input
                    label="Zip Code"
                    placeholder="eg: 446000"
                    {...register("zip_code")}
                  />
                </div>
              </section>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div>
            <div className="space-y-4 pt-6">
              <h2 className="font-bold text-xl text-gray-800">Order Summary</h2>

              {isLoading ? (
                "loading..."
              ) : isError ? (
                <p>{error.message}</p>
              ) : cart.items.length === 0 ? (
                "No cart items."
              ) : (
                <>
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.product_image}
                        className="h-16 w-16 rounded"
                        alt={item.product_title}
                      />
                      <div className="text-sm">
                        <p className="font-medium">{item.product_title}</p>
                        <p className="text-muted-foreground">
                          ${item.product_price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sub-total</span>
                      <span>${cart.total}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Charge</span>
                      <span className="text-green-600">FREE</span>
                    </div>

                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${cart.total}</span>
                    </div>
                  </div>
                </>
              )}
              <Separator />
              {/* payment method */}
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Payment Method</h3>

                {/* Cash on Delivery */}
                <label
                  htmlFor="cash"
                  className="flex items-center gap-4 border border-border shadow rounded-xl p-4 cursor-pointer
               hover:border-primary transition
               has-checked:border-primary
               has-checked:bg-primary/10
               has-checked:scale-[1.02]"
                >
                  <input
                    type="radio"
                    id="cash"
                    value="cod"
                    {...register("payment_method")}
                    className="hidden"
                  />

                  <img
                    src="dollar.png"
                    alt="Cash on Delivery"
                    className="h-10 w-10 object-contain"
                  />

                  <span className="font-medium">Cash on Delivery</span>
                </label>

                {/* E-sewa */}
                <label
                  htmlFor="esewa"
                  className="flex items-center gap-4 border border-border shadow rounded-xl p-4 cursor-pointer
               hover:border-primary transition
               has-checked:border-primary
               has-checked:bg-primary/10
               has-checked:scale-[1.02]"
                >
                  <input
                    type="radio"
                    id="esewa"
                    value="esewa"
                    {...register("payment_method")}
                    className="hidden"
                  />

                  <img
                    src="/esewa_logo.png"
                    alt="E-sewa"
                    className="h-10 w-16 object-contain bg-slate-800 px-2 rounded-md"
                  />

                  <span className="font-medium">E-sewa</span>
                </label>

                {/* error message */}
                {errors?.payment_method && (
                  <p className="text-sm text-red-500">
                    {errors.payment_method.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isPending} className="w-full mt-3">
               {
                isPending ? <>
                 <Spinner />
                 submitting...
                </> :
                 "Place Order"
               }
              </Button>
            </div>
          </div>
        </div>
      </form>
    </MaxWidthContainer>
  );
};

export default Checkout;
