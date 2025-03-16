import apiClient from "./apiclient";

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await apiClient.get("/usuario/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("usuario", JSON.stringify(userData));
    if (userData.avatarFile) {
      formData.append("file", userData.avatarFile);
    }
    const response = await apiClient.post("/usuario/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  try {
    const formData = new FormData();
    formData.append("usuario", JSON.stringify(userData));
    if (userData.avatarFile) {
      formData.append("file", userData.avatarFile);
    }
    const response = await apiClient.put(`/usuario/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    await apiClient.delete(`/usuario/delete/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};
