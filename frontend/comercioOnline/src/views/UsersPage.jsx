import React, { useEffect, useState } from "react";
import { getUsers } from "../api/usersapi";
import UsersList from "../components/UsersList";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="container">
      <h2>Usuarios</h2>
      <UsersList users={users} />
    </div>
  );
};

export default UsersPage;
