import axios from "axios";
axios.defaults.withCredentials = true;
const instance = axios.create({
  //  baseURL: "http://localhost:8080",
 baseURL: "https://gdu-feb25-event-be.onrender.com",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // ✅ Ensures cookies are sent and received
});

export default instance;
