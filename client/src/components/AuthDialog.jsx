import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/Button";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthDialog = () => {
  const [toogleForm, setToggleForm] = useState("sign-in");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {toogleForm === "sign-in" ? "sign in" : "sign up"}
        </Button>
        {/* <Button>sign up</Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-left text-gray-800">
            {toogleForm === "sign-in" ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        {/* form */}
        {toogleForm === "sign-in" ? <SignInForm /> : <SignUpForm setToggleForm={setToggleForm} />}

        <div className="text-center mt-4 text-sm font-semibold text-gray-600">
          {toogleForm === "sign-in" ? (
            <p>
              Dont have an account?
              <span onClick={()=> setToggleForm('sign-up')} className="text-primary ml-0.5 hover:underline cursor-pointer">sign up</span>
            </p>
          ) : (
            <p>Already have an account? 
              <span onClick={()=> setToggleForm('sign-in')}  className="text-primary ml-0.5 hover:underline cursor-pointer">sign in</span>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthDialog;
