import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/usersapi";
import UsersList from "../components/UsersList";
import UserForm from "../components/UserForm";
import Sidebar from "../components/sidebaradmin";

const UsersPageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    estado: "ACTIVO",
    rol: "USUARIO",
    fechaCreacion: "",
    ultimoLogin: "",
    token: "",
    intentosLogin: 0,
    avatarUrl: ""
  });
  const [showForm, setShowForm] = useState(false);

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

  const handleCreateOrUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("usuario", JSON.stringify(newUser));
      if (newUser.avatarFile) {
        formData.append("file", newUser.avatarFile);
      }

      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      setNewUser({
        username: "",
        email: "",
        password: "",
        nombre: "",
        estado: "ACTIVO",
        rol: "USUARIO",
        fechaCreacion: "",
        ultimoLogin: "",
        token: "",
        intentosLogin: 0,
        avatarUrl: ""
      });
      setEditingUser(null);
      setShowForm(false);
      loadUsers();
    } catch (error) {
      console.error("Error al crear o actualizar el usuario", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setNewUser({
      username: "",
      email: "",
      password: "",
      nombre: "",
      estado: "ACTIVO",
      rol: "USUARIO",
      fechaCreacion: "",
      ultimoLogin: "",
      token: "",
      intentosLogin: 0,
      avatarUrl: ""
    });
    setShowForm(true);
  };

  return (
    <div className="container">
      <Sidebar />
      <h2>Usuarios</h2>
      <button className="btn btn-success mb-3" onClick={handleAddUser}>
        Añadir Usuario
      </button>
      {showForm && (
        <div className="mb-4">
          <UserForm
            user={newUser}
            onChange={handleInputChange}
            onSubmit={handleCreateOrUpdateUser}
            editingUser={editingUser}
          />
        </div>
      )}
      <UsersList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UsersPageAdmin;



