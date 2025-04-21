import apiClient from "./apiClient";
import ICartItem from "@/model/interfaces/iCartItem";

// Obtener el carrito de un usuario
export const getCartByUserId = async (userId: number): Promise<ICartItem[]> => {
  try {
    const response = await apiClient.get<ICartItem[]>(`/carrito/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el carrito del usuario con ID ${userId}:`, error);
    throw error;
  }
};

// Añadir un producto al carrito
export const addToCart = async (userId: number, productId: number, quantity: number): Promise<void> => {
  try {
    await apiClient.post("/carrito/create", {
      userId,
      productId,
      quantity,
    });
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
    throw error;
  }
};