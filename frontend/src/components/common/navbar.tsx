import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { NotificationPopover } from "../shared/notification-popover";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
 
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-primary text-white py-2 px-5 md:px-20 flex items-center justify-between sticky top-0 z-10">
        <NavLink to={"/"} className={`text-2xl font-bold `}>
          HRMS
        </NavLink>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 max-md:hidden"></div>
          <UserButton />
        </div>
      </nav>
    </>
  );
};
