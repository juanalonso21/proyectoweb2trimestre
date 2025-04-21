import React from 'react';
import  ICategoria  from '@/model/interfaces/iCategoria';

interface CategoriasListAdminProps {
  categorias: ICategoria[];
  onEdit: (categoria: ICategoria) => void;
  onDelete: (id: number) => void;
}

const CategoriasListAdmin: React.FC<CategoriasListAdminProps> = ({ 
  categorias = [], 
  onEdit, 
  onDelete 
}) => {
  const baseURL = window.location.hostname === "localhost"
    ? "http://localhost:8090/img/"
    : "http://192.168.7.38:8090/img/";

  return (
    <div className="container mx-auto px-4 py-6">
      {categorias.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No hay categorías disponibles</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categorias.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{categoria.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{categoria.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{categoria.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {categoria.icono && (
                      <img
                        src={`${baseURL}${categoria.icono}`}
                        alt={categoria.nombre}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => onEdit(categoria)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(categoria.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriasListAdmin;