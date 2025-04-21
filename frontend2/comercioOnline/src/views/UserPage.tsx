import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "@/model/api/apiUsers";
import UsersList from "../components/UserList";
import UserForm from "../components/UserForm";
import IUser from "@/model/interfaces/iUser";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [newUser, setNewUser] = useState<IUser>({
    id: 0,
    username: "simeone",
    email: "algo",
    password: "1234",
    nombre: "so",
    estado: "ACTIVO",
    rol: "USUARIO",
    fechaCreacion: null,
    ultimoLogin: null,
    token: "algo",
    intentosLogin: 0,
    avatarUrl: "que",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar los usuarios", error);
    }
  };

  const handleCreateOrUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
  
    let avatarBase64 = newUser.avatarUrl;
    if (newUser.avatarUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarBase64 = reader.result as string;
      };
      reader.readAsDataURL(newUser.avatarUrl);
      await new Promise((resolve) => (reader.onloadend = resolve));
    }
  
    const userToSend = {
      ...newUser,
      avatarUrl: avatarBase64,
    };
  
    try {
      if (editingUser) {
        await updateUser(editingUser);
      } else {
        await createUser(userToSend);
      }
  
      setNewUser({
        id: 1,
        username: "Simeone",
        email: "algo@gmail",
        password: "1234",
        nombre: "simon",
        estado: "ACTIVO",
        rol: "USUARIO",
        fechaCreacion: null,
        ultimoLogin: null,
        token: "token",
        intentosLogin: 0,
        avatarUrl: "simeone",
      });
  
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error("Error al crear o actualizar el usuario", error);
    }
  };

  const handleEditUser = (user: IUser) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>
        
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            {editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </h3>
          <UserForm
            user={newUser}
            onChange={handleInputChange}
            onSubmit={handleCreateOrUpdateUser}
            editingUser={!!editingUser}
          />
        </div>

        <div className="overflow-x-auto">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Lista de Usuarios</h3>
          <UsersList 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;