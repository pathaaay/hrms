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
      <nav className="bg-primary py-2 px-5 flex items-center justify-between sticky top-0 z-10 w-full h-max">
        <SidebarTrigger className="-ml-2" variant={"outline"} />
        <div className="flex items-center gap-2">
          <NotificationPopover />
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setTheme(theme == "dark" ? "light" : "dark");
            }}
          >
            <SunIcon
              className={cn(
                "transition-all absolute",
                theme == "light" ? "scale-0" : "",
              )}
            />
            <MoonIcon
              className={cn(
                "transition-all absolute",
                theme == "light" ? "" : "scale-0",
              )}
            />
          </Button>
        </div>
      </nav>
    </>
  );
};
