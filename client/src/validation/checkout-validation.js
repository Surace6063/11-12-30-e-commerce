import * as yup from "yup";

export const checkoutSchema = yup.object({
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