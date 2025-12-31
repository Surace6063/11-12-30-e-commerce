import * as yup from "yup";

export const checkoutSchema = yup.object({
  full_name: yup.string().required("Full name is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  phone_number: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),

  company_name: yup.string().nullable(),

  pan_number: yup.string().nullable(),

  city: yup.string().required("City/District is required"),

  address: yup.string().required("Address is required"),

  zip_code: yup.string().nullable(),

  payment_method: yup
    .string()
    .required("Please select a payment method")
    .oneOf(["cod", "esewa"], "Invalid payment method"),
})
