import AxiosClient from "./apiClient";

export function postTourService(category) {
  return AxiosClient.post("/services/add_service", category);
}

export function getTourService() {
  return AxiosClient.get("/services/tour_services");
}

export function deleteTourService(id) {
  return AxiosClient.delete(`/services/tour_services/${id}`);
}

export function putTourService(id, updatedCategory) {
  return AxiosClient.put(`/services/tour_services/${id}`, updatedCategory);
}
