import React from "react";
import  IProduct  from "@/model/interfaces/iProduct";

interface CartItemProps {
    product: IProduct & { quantity?: number };
    onQuantityChange: (id: number, quantity: string) => void;
    onRemove: (id: number) => void;
  }
  
  const CartItem: React.FC<CartItemProps> = ({ product, onQuantityChange, onRemove }) => {
    const quantity = product.quantity || 1;
  
    return (
      <div className="grid grid-cols-12 gap-4 p-4 mb-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        {/* Imagen */}
        <div className="col-span-12 md:col-span-2 flex items-center">
          <img
            src={product.imagenUrl}
            alt={product.nombre}
            className="w-full h-auto max-h-24 object-contain"
          />
        </div>
  
        {/* Información */}
        <div className="col-span-12 md:col-span-4">
          <h3 className="font-semibold text-gray-800">{product.nombre}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.descripcion}</p>
          <span className="inline-block mt-1 text-xs text-blue-600">
            {product.categoria? product.categoria.nombre: "Sin categoria"}
          </span>
        </div>
  
        {/* Cantidad */}
        <div className="col-span-4 md:col-span-2 flex items-center">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => onQuantityChange(product.id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  
        {/* Precio Unitario */}
        <div className="col-span-4 md:col-span-2 flex items-center text-gray-700">
          ${product.precio.toFixed(2)}
        </div>
  
        {/* Precio Total */}
        <div className="col-span-4 md:col-span-1 flex items-center font-medium">
          ${(quantity * product.precio).toFixed(2)}
        </div>
  
        {/* Eliminar */}
        <div className="col-span-4 md:col-span-1 flex items-center justify-end">
          <button
            onClick={() => onRemove(product.id)}
            className="p-2 text-red-500 hover:text-red-700 transition-colors"
            title="Eliminar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default CartItem;