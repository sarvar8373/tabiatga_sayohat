import AxiosClient from "./apiClient";

export function postOrder(order) {
  return AxiosClient.post("/orders/add_order", order);
}

export function getOrder() {
  return AxiosClient.get("/orders/orders");
}

export function editOrder(id, order) {
  return AxiosClient.put(`/orders/order/${id}`, order);
}

export function deleteOrder(id) {
  return AxiosClient.delete(`/orders/order/${id}`);
}
