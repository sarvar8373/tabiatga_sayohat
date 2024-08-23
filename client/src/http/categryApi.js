import AxiosClient from "./apiClient";

export function postCategory(category) {
  return AxiosClient.post("/category/add_categories", category);
}

export function getCategories() {
  return AxiosClient.get("/category/categories");
}

export function deleteCategory(id) {
  return AxiosClient.delete(`/category/categories/${id}`);
}

export function putCategory(id, updatedCategory) {
  return AxiosClient.put(`/category/categories/${id}`, updatedCategory);
}
