import Axios from "axios";

let baseURL = "";
if (typeof window !== "undefined") {
  const getUrl = window.location;
  baseURL = getUrl.protocol + "//" + getUrl.host;
}

const instance = Axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

const api = {
  getBlogIndex: () => instance.get(`/blog`),
  getBlogShow: (id) => instance.get(`/blog/${id}`),
  postBlogStore: (form) => instance.post(`/blog/create`, form),
  putBlogUpdate: (form, id) => instance.put(`/blog/${id}/edit`, form),
  deleteBlogDelete: (id) => instance.delete(`/blog/${id}`),
  postAuthAuthenticate: (form) => instance.post(`/login`, form),
};

export default api;
