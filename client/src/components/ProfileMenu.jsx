import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuthStore from "../zustand/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("You loggedout sucessfully.");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col items-center">
          <img
            src="https://github.com/shadcn.png"
            alt="avtar"
            className="size-8 rounded-full"
          />
          <span className="font-medium text-gray-500 text-sm">
            {user?.username}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 border border-gray-100">
        <ul className="flex flex-col items-center gap-2">
          <li className="text-gray-700 font-medium cursor-pointer py-1 text-center w-full rounded-md hover:bg-slate-50 transition">
            Profile
          </li>
          <Link className="text-gray-700 font-medium cursor-pointer py-1 text-center w-full rounded-md hover:bg-slate-50 transition" 
          to="/orders">
            <li>
            orders
          </li>
          </Link>
          {user?.is_admin && (
            <Link
              className="text-gray-700 font-medium cursor-pointer py-1 text-center w-full rounded-md hover:bg-slate-50 transition"
              to="/dashboard/main"
            >
              <li>dashboard</li>
            </Link>
          )}
          <li
            onClick={handleLogout}
            className="text-gray-700 font-medium cursor-pointer py-1 text-center w-full rounded-md hover:bg-slate-50 transition"
          >
            logout
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
export default ProfileMenu;
