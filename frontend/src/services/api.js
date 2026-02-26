import axios from "axios";

const API = axios.create({
  baseURL:  "https://chatabot-backend.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("chatabot-token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
