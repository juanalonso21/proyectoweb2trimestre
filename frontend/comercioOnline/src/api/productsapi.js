import apiClient from "./apiclient";

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const response = await apiClient.get("/producto/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/producto/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post("/producto/create", productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/producto/update/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    await apiClient.delete(`/producto/delete/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
};