import React from "react";
import IUser from "../model/interfaces/iUser"; // Adjust the import path as necessary

interface UsersListProps {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onEdit, onDelete }) => {
  const baseURL = window.location.hostname === 'localhost' 
    ? "http://localhost:8090/img/" 
    : "http://192.168.0.23:8090/img/";

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      {users.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p>No hay usuarios disponibles</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Creación</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Login</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.estado === 'ACTIVO' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.rol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.fechaCreacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.ultimoLogin || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.avatarUrl && (
                      <img
                        src={`${baseURL}${user.avatarUrl}`}
                        alt={user.username}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
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

export default UsersList;