import React from "react";
import  IProduct  from "@/model/interfaces/iProduct";


interface ProductListAdminProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (id: number) => void;
}

const ProductListAdmin: React.FC<ProductListAdminProps> = ({ products, onEdit, onDelete }) => {
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8090/img/"
      : "http://192.168.0.23:8090/img/";

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos disponibles</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Precio</th>
                <th className="border border-gray-300 px-4 py-2">Categoría</th>
                <th className="border border-gray-300 px-4 py-2">Imagen</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.precio.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.categoria ? product.categoria.nombre : "Sin categoría"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.imagenUrl && (
                      <img
                        src={`${baseURL}${product.imagenUrl}`}
                        alt={product.nombre}
                        className="w-12 h-12 object-cover mx-auto"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      onClick={() => onEdit(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => onDelete(product.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductListAdmin;