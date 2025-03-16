import apiClient from "./apiclient";

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await apiClient.get("/categoria/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};