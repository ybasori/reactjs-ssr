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
  getBlogShow: (id: string) => instance.get(`/blog/${id}`),
  postBlogStore: (form: FormData) => instance.post(`/blog/create`, form),
  putBlogUpdate: (form: FormData, id: string) =>
    instance.put(`/blog/${id}/edit`, form),
  deleteBlogDelete: (id: string) => instance.delete(`/blog/${id}`),
  postAuthAuthenticate: (form: FormData) => instance.post(`/login`, form),
  postSignupRegister: (form: FormData) => instance.post(`/signup`, form),
};

export default api;
