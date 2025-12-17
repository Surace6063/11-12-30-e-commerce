import { RiMenu3Line } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import MaxWidthContainer from "./MaxWidthContainer";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

import AuthDialog from "./AuthDialog";
import useAuthStore from "../zustand/useAuthStore";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="border-b border-gray-300 py-4 sticky top-0 bg-white z-100">
      <MaxWidthContainer className="flex justify-between items-center">
        {/* left */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <MobileMenu />
          </div>
          {/* logo */}
          <Link to="/" className="flex items-center gap-0.5">
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
          {/* auth */}
          <div className="space-x-4">
            {isAuthenticated ? (
             <ProfileMenu />
            ) : (
              <AuthDialog />
            )}
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
