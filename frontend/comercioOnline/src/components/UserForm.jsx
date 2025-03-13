import React from "react";

const UserForm = ({ user, onChange, onSubmit, editingUser }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name: "avatarFile", value: file } }); // Guardamos el archivo en el estado
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("usuario", JSON.stringify(user)); // Convertimos el usuario a JSON

        if (user.avatarFile) {
          formData.append("file", user.avatarFile); // Adjuntar la imagen
        }

        onSubmit(formData);
      }}
    >
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={onChange}
        />
        <small className="form-text text-muted">Nunca compartiremos tu email con nadie.</small>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          placeholder="Nombre"
          value={user.nombre}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <select className="form-control" name="estado" value={user.estado} onChange={onChange}>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
          <option value="SUSPENDIDO">SUSPENDIDO</option>
        </select>
      </div>
      <div className="form-group">
        <label>Rol</label>
        <select className="form-control" name="rol" value={user.rol} onChange={onChange}>
          <option value="USUARIO">USUARIO</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPERADMIN">SUPERADMIN</option>
        </select>
      </div>
      <div className="form-group">
        <label>Avatar</label>
        <input type="file" className="form-control" onChange={handleImageChange} />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
      </button>
    </form>
  );
};

export default UserForm;
