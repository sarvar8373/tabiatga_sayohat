import AxiosClient from "./apiClient";

export function postNotification(notification) {
  return AxiosClient.post("/notification/add_notification", notification);
}

export function getNotification() {
  return AxiosClient.get("/notification/notifications");
}
