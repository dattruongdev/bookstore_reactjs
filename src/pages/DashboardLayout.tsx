import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
