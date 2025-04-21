import IProduct from "./iProduct";

export default interface ICartItem {
  id: number; // ID del carrito
  usuarioId: number; // ID del usuario asociado al carrito
  productos: IProduct[]; // Lista de productos en el carrito
  cantidad: number; // Cantidad total de productos en el carrito
}