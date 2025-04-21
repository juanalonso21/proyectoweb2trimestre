import React, { ChangeEvent, FormEvent } from "react";
import IUser from "../model/interfaces/iUser"; 

interface UserFormProps {
  user: IUser;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void; // Asegúrate de que acepte el evento del formulario
  editingUser: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, onChange, onSubmit, editingUser }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        target: {
          name: "avatarUrl",
          value: file,
        },
      } as unknown as ChangeEvent<HTMLInputElement>); 
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e); // Pasar el evento al controlador
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={onChange}
          required={!editingUser}
          minLength={editingUser ? undefined : 8}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="nombre"
          placeholder="Nombre"
          value={user.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Avatar</label>
        <input
          type="file"
          className="w-full px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
      </button>
    </form>
  );
};

export default UserForm;