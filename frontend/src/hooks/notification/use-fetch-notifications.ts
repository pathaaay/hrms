import { getAllNotifications } from "@/api/actions/notification";
import type { INotification } from "@/lib/types/notification";
import { useQuery } from "@tanstack/react-query";

export const useFetchNotifications = (): {
  isPending: boolean;
  notifications: INotification[] | undefined;
} => {
  const { data: notifications, isPending } = useQuery<INotification[]>({
    queryKey: [`all-notifications`],
    queryFn: () => getAllNotifications(),
  });

  return { isPending, notifications };
};
