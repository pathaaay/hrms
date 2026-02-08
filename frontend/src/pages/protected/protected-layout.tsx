import { Navbar } from "@/components/common/navbar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { useFetchUser } from "@/hooks/user/use-fetch-user";
import { LoaderIcon } from "react-hot-toast";
const ProtectedLayout = () => {
  const { isPending } = useFetchUser();

  if (isPending)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="size-10! animate-spin" />
      </div>
    );

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Navbar />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
