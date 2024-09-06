import AxiosClient from "./apiClient";

export function postTour(credentials) {
  return AxiosClient.post("/tours/add_tour", credentials, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function getTours() {
  return AxiosClient.get("/tours");
}
export function getCategories() {
  return AxiosClient.get("/category/categories");
}
export function deleteTours(id) {
  return AxiosClient.delete(`/tours/tour/${id}`);
}
export function putTour(id, updatedPost) {
  return AxiosClient.put(`/tours/tour/${id}`, updatedPost, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateTourCause(id, cause) {
  return AxiosClient.put(`/tours/tour/cause/${id}`, { cause });
}
export function updateTourStatus(id, status) {
  return AxiosClient.put(`/tours/tour/status/${id}`, { status });
}
