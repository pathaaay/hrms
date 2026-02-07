import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/store/slices/user-slice";
import type { IUserProfile } from "@/lib/types/user";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { NotificationPopover } from "../shared/notification-popover";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

interface NavbarProps {
  userProfile: IUserProfile | undefined;
}

export const Navbar = ({ userProfile }: NavbarProps) => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    dispatch(setUser(userProfile));
    return () => {};
  }, [userProfile]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-primary py-2 px-5 flex items-center justify-between sticky top-0 z-10 w-full h-max">
        <SidebarTrigger className="-ml-2" />
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
