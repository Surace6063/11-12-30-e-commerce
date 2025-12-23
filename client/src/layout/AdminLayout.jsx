import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "@/components/admin/AdminSideBar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <SidebarProvider>
        <AdminSideBar />
        <main>
            <SidebarTrigger />
            <Outlet />
        </main>
    </SidebarProvider>
  )
}
export default AdminLayout