import { getUser } from "@/api/actions/user";
import { Navbar } from "@/components/common/navbar";
import type { IUserProfile } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";
import { AppSidebar } from "@/components/common/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
const ProtectedLayout = () => {
  const { data } = useQuery<IUserProfile>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Navbar userProfile={data} />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
