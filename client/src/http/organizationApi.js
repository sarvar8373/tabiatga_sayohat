import AxiosClient from "./apiClient";

export function postOrganization(credentials) {
  return AxiosClient.post("/organization/add_organization", credentials);
}
export function getOrganizations() {
  return AxiosClient.get("/organization/organizations");
}
export function getOrganization(id) {
  return AxiosClient.get(`/organization/organizations/${id}`);
}
export function deleteOrganization(id) {
  return AxiosClient.delete(`organization/organizations/${id}`);
}
export function putOrganization(id, updatedPost) {
  return AxiosClient.put(`/organization/organizations/${id}`, updatedPost);
}
