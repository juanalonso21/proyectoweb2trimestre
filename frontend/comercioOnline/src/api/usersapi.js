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
export const createUser = async (formData) => {
  try {
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
export const updateUser = async (id, formData) => {
  try {
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
export const loginUser = async (credentials) => {
  try {
    // Asegúrate de que el Content-Type es application/json
    const response = await apiClient.post("/usuario/login", credentials, {
      headers: {
        "Content-Type": "application/json", // Especificamos que estamos enviando JSON
      },
    });
    return response.data; // Devuelve la respuesta del backend
  } catch (error) {
    console.error("Error al realizar login:", error);
    throw error; // Lanza el error si algo falla
  }
};