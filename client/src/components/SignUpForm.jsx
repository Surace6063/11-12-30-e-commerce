import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpFormValidationSchema } from "../validation/auth-validation";
import { Spinner } from "@/components/ui/spinner"
import {apiRequest} from "@/libs/apiRequest"
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = ({setToggleForm}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormValidationSchema)
  })

  const {mutate,isPending} = useMutation({
    mutationFn: async (data) => await apiRequest.post("/auth/register/",data),
    onSuccess: () => {
      toast.success("You registered sucessfully.")
      setToggleForm("sign-in")
    },
    onError: (error) => {
        if(error?.response && error?.response?.data){
        if(error?.response?.data?.email){
          toast.error(error?.response?.data?.email[0])
        }

         if(error?.response?.data?.username){
          toast.error(error?.response?.data?.username[0])
        }
      }
    }
  })

  // handle sign up
  const handleSignUp = (data) => {
     mutate(data)
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
      <Button disabled={isPending} className="w-full">
        {
          isPending ? <>
           <Spinner />
           signing up...
          </> : "sign up"
        }
      </Button>
    </form>
  );
};
export default SignUpForm;
