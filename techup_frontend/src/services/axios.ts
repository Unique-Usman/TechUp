import axios from "axios";
const BASE_URL = "http://127.0.0.1:5000/api";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosUpdateUser= axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});
