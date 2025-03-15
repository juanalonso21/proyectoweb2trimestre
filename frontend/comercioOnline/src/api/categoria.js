import axios from "axios";
import apiClient from "./apiclient";

// Obtener todas las categorías
export const getCategories = async () => {
  try {
    const response = await apiClient.get("/categoria/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (id) => {
  try {
    const response = await apiClient.get(`/categoria/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la categoría con ID ${id}:`, error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post("/categoria/create", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await apiClient.put(`/categoria/update/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la categoría con ID ${id}:` , error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  try {
    await apiClient.delete(`/categoria/delete/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la categoría con ID ${id}:`, error);
    throw error;
  }
};