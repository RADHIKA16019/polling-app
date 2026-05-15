import axios from "axios";

const API = axios.create({
  baseURL: "https://polling-app-0lj8.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN SENT:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;

export const createPoll = (data) => API.post("/polls/create", data);
