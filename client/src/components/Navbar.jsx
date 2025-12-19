import { CiShoppingCart } from "react-icons/ci";
import MaxWidthContainer from "./MaxWidthContainer";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

import AuthDialog from "./AuthDialog";
import useAuthStore from "../zustand/useAuthStore";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { useCarts } from "../api/cart-services";

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useCarts();

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
            {isAuthenticated ? <ProfileMenu /> : <AuthDialog />}
          </div>
          <Link
            to="/carts"
            className="relative flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition"
          >
            <CiShoppingCart size={28} className="text-zinc-700" />

            {cart?.total_quantity > 0 && (
              <span className="absolute top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary text-white text-xs font-medium leading-none">
                {cart.total_quantity}
              </span>
            )}
          </Link>
        </div>
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;
