import * as yup from "yup";


export const productFormValidationSchema = yup.object({
  category: yup.string().required("Category is required"),
  title: yup.string().min(3, "Minimum 3 characters").required("Title is required"),
  description: yup
    .string()
    .min(10, "Minimum 10 characters")
    .required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Only image files allowed", (file) =>
      file?.type?.startsWith("image/")
    ),
});