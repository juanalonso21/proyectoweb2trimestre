import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8090/api", // Base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
