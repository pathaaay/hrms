import { apiService } from "@/lib/axios";

const NOTIFICATIONS_ENDPOINT = "/notifications";

export const getAllNotifications = async () => {
  const res = await apiService.get(NOTIFICATIONS_ENDPOINT);
  return res.data;
};

export const markAsReadNotification = async (id: number) => {
  const res = await apiService.patch(`${NOTIFICATIONS_ENDPOINT}/${id}`);
  return res.data;
};
