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
export const createCategoria = async (categoriaData, file) => {
  try {
    const formData = new FormData();
    
    // Convertir el objeto categoriaData a JSON y agregarlo al FormData
    formData.append("categoria", JSON.stringify(categoriaData));
    
    // Si existe un archivo, agregarlo al FormData
    if (file) {
      formData.append("file", file);
    }
    
    // Enviar la solicitud POST con el FormData
    const response = await apiClient.post("/categoria/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Especificar el tipo de contenido adecuado
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategoria = async (id, categoriaData, file) => {
  try {
    const formData = new FormData();
    
    // Convertir el objeto categoriaData a JSON y agregarlo al FormData
    formData.append("categoria", JSON.stringify(categoriaData));
    
    // Si existe un archivo, agregarlo al FormData
    if (file) {
      formData.append("file", file);
    }

    // Enviar la solicitud PUT con el FormData
    const response = await apiClient.put(`/categoria/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Especificar el tipo de contenido adecuado
      },
    });

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
