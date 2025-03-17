import axios from "axios";

const baseURL = window.location.hostname === 'localhost' 
  ? "http://localhost:8090/api" 
  : "http://192.168.7.38:8090/api";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default apiClient;
