import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Store } from "lucide-react";
import cn from "../../libs/cn";
import {Separator} from "@/components/ui/separator"

// Menu items.
const items = [
  {
    title: "Main",
    url: "/dashboard/main",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Inbox,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Search,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Settings,
  },
];

const AdminSideBar = () => {
  const location = useLocation()
  return (
    <Sidebar className="border-none">
      <SidebarHeader className=" py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <h1 className="text-base font-semibold tracking-tight">ShopFlow</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <Separator className="my-3" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                  className={
                    cn(
                      "py-5 font-semibold",
                      location.pathname === item.url && "bg-slate-800 text-white hover:bg-slate-800 hover:text-white shadow-xs"
                    )
                  }
                  asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSideBar;
