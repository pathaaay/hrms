
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navLinks } from "@/lib/constants";
import { NavLink } from "react-router";

export function SidebarLinks() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navLinks.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton tooltip={item.label} asChild>
              <NavLink
                className={"[.active]:bg-secondary [.active]:text-primary"}
                to={item.url}
              >
                <item.icon />
                <span>{item.label}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
