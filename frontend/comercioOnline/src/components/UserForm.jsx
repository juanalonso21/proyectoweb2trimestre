import React from "react";

const UserForm = ({ user, onChange, onSubmit, editingUser }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name: "avatarFile", value: file } });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
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
          placeholder="Email"
          value={user.email}
          onChange={onChange}
        />
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
