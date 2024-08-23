import AxiosClient from "./apiClient";

export function postPosts(formData) {
  return AxiosClient.post("/posts/add_posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getPosts() {
  return AxiosClient.get("/posts/posts");
}

export function getCategories() {
  return AxiosClient.get("/category/categories");
}

export function deletePosts(id) {
  return AxiosClient.delete(`/posts/post/${id}`);
}

export function putPost(id, updatedPost) {
  return AxiosClient.put(`/posts/post/${id}`, updatedPost, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
