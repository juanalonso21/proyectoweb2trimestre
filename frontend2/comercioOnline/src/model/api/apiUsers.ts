import apiClient from "./apiClient";
import IUser from "@/model/interfaces/iUser";

// Obtener todos los usuarios
export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await apiClient.get("/usuario");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUserById = async (id: number): Promise<IUser> => {
  try {
    const response = await apiClient.get(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await apiClient.post("/usuario", user);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await apiClient.put(`/usuario/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/usuario/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async (
  username: string,
  password: string
): Promise<{ success: boolean; user?: IUser }> => {
  try {
    const response = await apiClient.post("/usuario/login", { username, password });
    return response.data; // Asegúrate de que el backend devuelve { success: boolean, user?: IUser }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

