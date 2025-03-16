import React from "react";

const UsersList = ({ users, onEdit, onDelete }) => {
  const baseURL = window.location.hostname === 'localhost' 
    ? "http://localhost:8090/img/" 
    : "http://192.168.0.23:8090/img/";

  return (
    <div className="container">
      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Fecha Creación</th>
              <th>Último Login</th>
              <th>Token</th>
              <th>Intentos Login</th>
              <th>Avatar URL</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.nombre}</td>
                <td>{user.estado}</td>
                <td>{user.rol}</td>
                <td>{user.fechaCreacion}</td>
                <td>{user.ultimoLogin ? user.ultimoLogin : "N/A"}</td>
                <td>{user.token ? user.token : "N/A"}</td>
                <td>{user.intentosLogin}</td>
                <td>
                  {user.avatarUrl && (
                    <img
                      src={`${baseURL}${user.avatarUrl}`}
                      alt={user.username}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => onEdit(user)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => onDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
