import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Link} from "react-router-dom"
 
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
]
 
const AdminSideBar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
  )
}

export default AdminSideBar