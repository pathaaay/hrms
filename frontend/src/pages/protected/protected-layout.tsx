import { Navbar } from "@/components/common/navbar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { useFetchUser } from "@/hooks/user/use-fetch-user";
import { CustomLoader } from "@/components/common/custol-loader";
const ProtectedLayout = () => {
  const { isPending } = useFetchUser();

  if (isPending) return <CustomLoader />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full overflow-x-auto">
        <Navbar />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
