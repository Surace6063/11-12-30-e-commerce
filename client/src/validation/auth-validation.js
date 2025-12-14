import * as yup from "yup";

// sign up form validation schema
export const signUpFormValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid format!")
    .required("Email is required."),

  username: yup
    .string()
    .required("Username is required.")
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must not exceed 20 characters.")
    .matches(
      /^[A-Za-z]/,
      "Username must start with a letter."
    )
    .matches(
      /^[A-Za-z0-9_]+$/,
      "Username can only contain letters, numbers, and underscore."
    ),

  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(25, "Password must not exceed 25 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one symbol."),
});


// sign in form validation schema
export const signInFormValidationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required."), 
    password: yup
      .string()
      .required("Password is required.")
});