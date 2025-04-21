import apiClient from "./apiClient";
import IProduct from "@/model/interfaces/iProduct";

// Obtener todos los productos
export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await apiClient.get<IProduct[]>("/producto/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<IProduct> => {
  try {
    const response = await apiClient.get<IProduct>(`/producto/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto con imagen
export const createProduct = async (formData: FormData): Promise<IProduct> => {
  try {
    const response = await apiClient.post<IProduct>("/producto/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Asegúrate de usar este encabezado
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Actualizar un producto con imagen
export const updateProduct = async (id: number, formData: FormData): Promise<IProduct> => {
  try {
    const response = await apiClient.put<IProduct>(`/producto/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Asegúrate de usar este encabezado
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/producto/delete/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId: number): Promise<IProduct[]> => {
  try {
    const response = await apiClient.get<IProduct[]>(`/producto/categoria/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los productos de la categoría con ID ${categoryId}:`, error);
    throw error;
  }
};

// Buscar productos por término
export const searchProducts = async (query: string): Promise<IProduct[]> => {
  try {
    const response = await apiClient.get<IProduct[]>(`/producto/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error al buscar productos con el término "${query}":`, error);
    throw error;
  }
};