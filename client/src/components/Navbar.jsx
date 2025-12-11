import { RiMenu3Line } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import MaxWidthContainer from "./MaxWidthContainer";
import SearchBar from "./SearchBar";
import {Link} from "react-router-dom"

import { Button } from "./ui/Button";
import AuthDialog from "./AuthDialog";

const Navbar = () => {
  return (
    <div className="border-b border-gray-300 py-4 sticky top-0 bg-white z-100">
      <MaxWidthContainer className="flex justify-between items-center">
        {/* left */}
        <div className="flex items-center gap-4">
          <span className="md:hidden cursor-pointer hover:bg-slate-50 transition">
            <RiMenu3Line size={25} />
          </span>
          {/* logo */}
          <Link to='/' className="flex items-center gap-0.5">
            <img src="logo.png" alt="logo" className="size-8 md:size-10" />
            <div className="text-xl font-bold text-gray-800">
              Shop<span className="text-primary">Flow</span>
            </div>
          </Link>
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        {/* right */}
        <div className="flex gap-6 items-center">
          {/* buttons */}
          <div className="space-x-4">
            <AuthDialog />
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
