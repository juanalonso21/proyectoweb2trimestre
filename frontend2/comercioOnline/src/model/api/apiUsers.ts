import apiClient from "./apiClient";
import IUser from "@/model/interfaces/iUser";
export const getUsers = async (): Promise<IUser[]> => {
  try {
    const response = await apiClient.get("/usuario");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};
export const getUserById = async (id: number): Promise<IUser> => {
  try {
    const response = await apiClient.get(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await apiClient.post("/usuario", user);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};
export const updateUser = async (user: IUser): Promise<IUser> => {
    try {
        const response = await apiClient.put(`/usuario/${user.id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
    };
export const deleteUser = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/usuario/${id}`);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
};
export const loginUser = async (username: string, password: string): Promise<IUser> => {
    try {
        const response = await apiClient.post("/usuario/login", { username, password });
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

