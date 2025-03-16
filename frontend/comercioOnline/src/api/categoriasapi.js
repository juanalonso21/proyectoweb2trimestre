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

// Crear una nueva categoría
export const createCategoria = async (categoriaData) => {
  try {
    const response = await apiClient.post("/categoria/create", categoriaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategoria = async (id, categoriaData) => {
  try {
    const response = await apiClient.put(`/categoria/update/${id}`, categoriaData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la categoría con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategoria = async (id) => {
  try {
    await apiClient.delete(`/categoria/delete/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la categoría con ID ${id}:`, error);
    throw error;
  }
};