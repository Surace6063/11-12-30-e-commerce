import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signInFormValidationSchema } from "../validation/auth-validation";
import { Spinner } from "@/components/ui/spinner"
import {apiRequest} from "@/libs/apiRequest"
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const SignInForm = ({setOpen}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormValidationSchema)
  })

  const {mutate,isPending} = useMutation({
      mutationFn: async (authData) => {
        const response = await apiRequest.post("/auth/login/",authData)
        return response.data
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success("You loggedIn sucessfully.")
        setOpen(false)
      },
      onError: (error) => {
        if(error?.response && error?.response?.data){
        toast.error(error?.response?.data?.detail)
      }
      }
    })

  // handle sign up
  const handleSignIn = (data) => {
     mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="mt-6 space-y-4">
      
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
      <Button disabled={isPending} className="w-full">
        {
          isPending ? <>
           <Spinner />
           signing in...
          </> : "sign in"
        }
      </Button>
    </form>
  );
};
export default SignInForm;
