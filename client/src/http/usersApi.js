import AxiosClient from "./apiClient";

export function getUserDetails() {
  return AxiosClient.get("auth/user", {
    withCredentials: true,
  });
}
export function getUsers() {
  return AxiosClient.get("auth/users", {
    withCredentials: true,
  });
}

export function getAuth() {
  return AxiosClient.get("auth/check", {
    withCredentials: true,
  });
}
export function getUserID(id) {
  return AxiosClient.get(`/auth/user/${id}`, {
    withCredentials: true,
  });
}
export function postLogin(credentials) {
  return AxiosClient.post("/auth/login", credentials);
}
export function postRegister(credentials) {
  return AxiosClient.post("/auth/add_user", credentials, {
    withCredentials: true,
  });
}
export function getRegions() {
  return AxiosClient.get("/region/regions");
}
export function getDistricts() {
  return AxiosClient.get("/district/districts");
}
export function getStatistics() {
  return AxiosClient.get("/statistics", {
    withCredentials: true,
  });
}
export function putUser(id, updatedUser) {
  return AxiosClient.put(`/auth/user/${id}`, updatedUser, {
    withCredentials: true,
  });
}
export function deleteUser(id) {
  return AxiosClient.delete(`/auth/user/${id}`, {
    withCredentials: true,
  });
}
export function getSelectRegion(id) {
  return AxiosClient.get(`/district/districts/region/${id}`);
}
