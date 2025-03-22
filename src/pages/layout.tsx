import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import URL from "@/constant/url";
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { Link, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex w-screen h-screen">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="mt-2">
            <Link to={URL.HOME} className="text-center font-bold text-xl tracking-wider">
              TRACK MY JOBS
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={URL.HOME}>
                        <LayoutDashboardIcon />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={URL.HOME}>Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={URL.HOME}>Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenuButton asChild>
                  <Link to={URL.HOME}>
                    <SettingsIcon />
                    <span>Setting</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
        <main>
          <SidebarTrigger className="cursor-pointer" />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;
