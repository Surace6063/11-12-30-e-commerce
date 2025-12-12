import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa"

const SignInForm = () => {
  return (
   <form className="mt-6 space-y-4">
      {/* username */}
      <Input placeholder="john doe" label="Username" id="username" />
      {/* password */}
      <Input type="password" placeholder="**********" label="Password" id="password" />
      <Button className="w-full">
        sign in
      </Button>

    </form>
  )
}
export default SignInForm