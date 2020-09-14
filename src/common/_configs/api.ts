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
  postBlogStore: (form: FormData) =>
    instance.post(`/blog/create`, form, {
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector("meta[name='csrf-token']")
          ?.getAttribute("content"),
      },
    }),
  putBlogUpdate: (form: FormData, id: string) =>
    instance.put(`/blog/${id}/edit`, form, {
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector("meta[name='csrf-token']")
          ?.getAttribute("content"),
      },
    }),
  deleteBlogDelete: (id: string) =>
    instance.delete(`/blog/${id}`, {
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector("meta[name='csrf-token']")
          ?.getAttribute("content"),
      },
    }),
  postAuthAuthenticate: (form: FormData) =>
    instance.post(`/login`, form, {
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector("meta[name='csrf-token']")
          ?.getAttribute("content"),
      },
    }),
  postSignupRegister: (form: FormData) =>
    instance.post(`/signup`, form, {
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector("meta[name='csrf-token']")
          ?.getAttribute("content"),
      },
    }),
};

export default api;
