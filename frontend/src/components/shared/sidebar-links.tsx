import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navLinks } from "@/lib/constants";
import { NavLink, useLocation } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useUser } from "@/hooks/user/use-user";
import { cn } from "@/lib/utils";

export function SidebarLinks() {
  const { pathname } = useLocation();
  const { userRole } = useUser();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navLinks.map((item) => {
          if (item?.items && item?.items?.length > 0)
            return (
              <Collapsible
                key={item.label}
                asChild
                className="group/collapsible"
                defaultOpen={pathname.startsWith(item.url)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.label}>
                      {item.icon && (
                        <item.icon className={cn(item?.iconClass)} />
                      )}
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        if (
                          subItem?.requiredRoles?.length &&
                          userRole &&
                          !subItem.requiredRoles.toString()?.includes(userRole)
                        )
                          return;
                        const link = item.url + subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname == link}
                            >
                              <NavLink
                                className={
                                  "data-[active=true]:bg-secondary data-[active=true]:text-primary!"
                                }
                                to={link}
                              >
                                <span>{subItem.label}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );

          return (
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
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
