import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpFormValidationSchema } from "../validation/auth-validation";
import { Spinner } from "@/components/ui/spinner"
import {apiRequest} from "@/libs/apiRequest"
import toast from "react-hot-toast";

const SignUpForm = ({setToggleForm}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormValidationSchema)
  })

  // handle sign up
  const handleSignUp = async (data) => {
    try {
      // send user data to server
      await apiRequest.post("/auth/register/",data)
      toast.success("You registered sucessfully.")
      setToggleForm("sign-in") // change toogleForm state to sign-in
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="mt-6 space-y-4">
      {/* email */}
      <Input
        {...register("email")}
        type="email"
        placeholder="abc@gmail.com"
        label="Email"
        id="email"
        error = {errors?.email?.message}
      />
      
      {/* username */}
      <Input
        {...register("username")}
        placeholder="john doe"
        label="Username"
        id="username"
        error = {errors?.username?.message}
      />
      {/* password */}
      <Input
        {...register("password")}
        type="password"
        placeholder="**********"
        label="Password"
        id="password"
        error = {errors?.password?.message}
      />
      <Button disabled={isSubmitting} className="w-full">
        {
          isSubmitting ? <>
           <Spinner />
           signing up...
          </> : "sign up"
        }
      </Button>
    </form>
  );
};
export default SignUpForm;
