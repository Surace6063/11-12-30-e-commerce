import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import { ChevronsLeft } from "lucide-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* ================= VALIDATION SCHEMA ================= */
const checkoutSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  companyName: yup.string().nullable(),
  panVat: yup.string().nullable(),
  city: yup.string().required("City/District is required"),
  address: yup.string().required("Address is required"),
  zipCode: yup.string().nullable(),
});

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = (data) => {
    console.log("Checkout Data:", data);
  };

  return (
    <MaxWidthContainer className="my-6 max-w-6xl">
      <Button className="mb-6 text-gray-700 font-semibold" variant="ghost">
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
                    {...register("fullName")}
                    error={errors?.fullName?.message}
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
                  {...register("phone")}
                  error={errors?.phone?.message}
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
                    {...register("companyName")}
                  />
                  <Input
                    label="PAN/VAT Number"
                    placeholder="12XXXXXX"
                    {...register("panVat")}
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
                    {...register("zipCode")}
                  />
                </div>
              </section>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div>
            <div className="space-y-4 pt-6">
              <h2 className="font-bold text-xl text-gray-800">
                Order Summary
              </h2>

              <div className="flex gap-3">
                <img
                  src="https://via.placeholder.com/80"
                  className="h-16 w-16 rounded"
                  alt=""
                />
                <div className="text-sm">
                  <p className="font-medium">
                    Apple MacBook Air M4 13"
                  </p>
                  <p className="text-muted-foreground">
                    Rs. 1,69,000 × 3
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <img
                  src="https://via.placeholder.com/80"
                  className="h-16 w-16 rounded"
                  alt=""
                />
                <div className="text-sm">
                  <p className="font-medium">
                    Samsung Galaxy Buds3 Pro
                  </p>
                  <p className="text-muted-foreground">
                    Rs. 31,999 × 1
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sub-total</span>
                  <span>Rs 5,38,999</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs 5,38,999</span>
                </div>
              </div>

              <Separator />

              <Button type="submit" className="w-full mt-3">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </MaxWidthContainer>
  );
}
