import apiClient from "./apiClient";
import IUser from "../interfaces/iUser";

// Obtener todos los usuarios
export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await apiClient.get<IUser[]>("/usuario");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUserById = async (id: number): Promise<IUser> => {
  try {
    const response = await apiClient.get<IUser>(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await apiClient.post<IUser>("/usuario", user);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await apiClient.put<IUser>(`/usuario/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/usuario/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async (username: string, password: string): Promise<IUser> => {
  try {
    const response = await apiClient.post<IUser>("/usuario/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

