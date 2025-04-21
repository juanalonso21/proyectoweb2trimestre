import React from "react";
import  IProduct  from "@/model/interfaces/iProduct";
import { Link } from "react-router-dom";
interface ProductListaProps {
  products: IProduct[];
}

const ProductLista: React.FC<ProductListaProps> = ({ products }) => {
  const baseURL = window.location.hostname === "localhost" 
    ? "http://localhost:8090/img/" 
    : "http://192.168.7.38:8090/img/";

  return (
    <div className="mt-6">
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
                {/* Contenedor de imagen */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {product.imagenUrl && (
                    <img
                      src={`${baseURL}${product.imagenUrl}`}
                      alt={product.nombre}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.descripcion}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">${product.precio.toFixed(2)}</span>
                    <Link to={`/producto/${product.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      Ver más...
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductLista;