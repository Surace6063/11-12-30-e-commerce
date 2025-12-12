import * as yup from "yup"

export const signUpFormValidationSchema = yup.object({
    email: yup.string().email("Invalid format!").required("Email is required."),
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required.")
})