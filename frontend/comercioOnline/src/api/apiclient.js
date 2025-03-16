import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8090/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default apiClient;
