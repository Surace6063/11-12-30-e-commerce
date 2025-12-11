import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  return (
    <form className="mt-6 space-y-4">
      {/* email */}
      <Input type="email" placeholder="abc@gmail.com" label="Email" id="email" />
      {/* username */}
      <Input placeholder="john doe" label="Username" id="username" />
      {/* password */}
      <Input type="password" placeholder="**********" label="Password" id="password" />
      <Button className="w-full">
        sign up
      </Button>
    </form>
  );
};
export default SignUpForm;
