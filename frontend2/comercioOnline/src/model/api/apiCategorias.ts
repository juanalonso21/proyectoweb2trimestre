import apiClient from "@/model/api/apiClient";
import  ICategoria  from "@/model/interfaces/iCategoria";


export const getCategorias = async (): Promise<ICategoria[]> => {
  try {
    const response = await apiClient.get<ICategoria[]>("/categoria/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};

export const createCategoria = async (formData: FormData): Promise<ICategoria> => {
  try {
    const response = await apiClient.post<ICategoria>("/categoria/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría:", error);
    throw error;
  }
};

export const updateCategoria = async (id: number, formData: FormData): Promise<ICategoria> => {
  try {
    const response = await apiClient.put<ICategoria>(`/categoria/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la categoría con ID ${id}:`, error);
    throw error;
  }
};

export const deleteCategoria = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/categoria/delete/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la categoría con ID ${id}:`, error);
    throw error;
  }
};