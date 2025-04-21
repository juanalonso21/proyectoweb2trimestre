import React from "react";
import  IProduct  from "@/model/interfaces/iProduct";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
    {/* Imagen del producto */}
    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
      <img 
        src={product.imagenUrl || "https://via.placeholder.com/150"} 
        alt={product.nombre}
        className="object-contain h-full w-full"
        loading="lazy"
      />
    </div>
    
    {/* Contenido de la tarjeta */}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.nombre}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{product.descripcion}</p>
      
      {/* Precio y botón */}
      <div className="mt-auto">
        {product.precio && (
          <p className="text-xl font-bold text-gray-900 mb-3">
            ${product.precio.toFixed(2)}
          </p>
        )}
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300"
          onClick={() => console.log('Ver detalle', product.id)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  </div>
  );
};

export default ProductCard;