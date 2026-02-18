import { BellIcon, FolderOpen, Loader } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { useFetchNotifications } from "@/hooks/notification/use-fetch-notifications";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { useMarkAsReadMutation } from "@/api/mutations/notification";
import { ScrollArea } from "../ui/scroll-area";

export const NotificationsPopover = () => {
  const { mutate: handleMarkAsRead, isPending: isMarkingAsRead } =
    useMarkAsReadMutation();
  const { isPending, notifications } = useFetchNotifications();
  const unreadNotificationsLength = notifications?.filter(
    ({ isRead }) => !isRead,
  ).length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        {isPending ? (
          <Skeleton
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          />
        ) : (
          <Button variant="outline" size="icon" className={cn(`relative`)}>
            <BellIcon />
            <span className="sr-only">Notifications</span>
            {unreadNotificationsLength != 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 size-5 rounded-full">
                {unreadNotificationsLength}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <span className="font-medium">Notifications</span>
        </div>
        <Separator className="" />
        <ScrollArea className="max-h-[60vh] pr-1 flex flex-col gap-2 p-0.5">
          {notifications?.map((item) => (
            <Item
              variant="default"
              key={item.id}
              className="hover:bg-accent flex items-start gap-2 rounded-lg px-2 py-1.5"
            >
              <ItemContent>
                <ItemTitle title={item.title}>{item.title}</ItemTitle>
                <ItemDescription title={item.description}>
                  {item.description}
                </ItemDescription>
              </ItemContent>
              {!item?.isRead && (
                <ItemActions>
                  <Button
                    onClick={() => handleMarkAsRead(item.id)}
                    title="Mark as read"
                    variant="secondary"
                    disabled={isMarkingAsRead}
                    size="icon-sm"
                  >
                    {isMarkingAsRead ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <FolderOpen />
                    )}
                  </Button>
                </ItemActions>
              )}
            </Item>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
