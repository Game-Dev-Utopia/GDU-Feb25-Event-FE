import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // ✅ Ensures cookies are sent and received
});

export default instance;
