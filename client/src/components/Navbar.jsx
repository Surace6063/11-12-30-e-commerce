import { RiMenu3Line } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import MaxWidthContainer from "./MaxWidthContainer";
import Button from "./ui/Button";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="border-b border-gray-300 py-4">
      <MaxWidthContainer className="flex justify-between items-center">
        {/* left */}
        <div className="flex items-center gap-4">
          <span className="md:hidden cursor-pointer hover:bg-slate-50 transition">
            <RiMenu3Line size={25} />
          </span>
          {/* logo */}
          <div className="flex items-center gap-0.5">
            <img src="logo.png" alt="logo" className="size-8 md:size-10" />
            <div className="text-xl font-bold text-gray-800">
              Shop<span className="text-primary">Flow</span>
            </div>
          </div>
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        {/* right */}
        <div className="flex gap-6 items-center">
          {/* buttons */}
          <div className="space-x-4">
            <Button variant="ghost">
              sign in
            </Button>
            <Button>
              sign up
            </Button>
          </div>
          <div className="hover:bg-slate-50 cursor-pointer transition">
            <CiShoppingCart size={30} className="text-gray-700" />
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;
