import React from "react";
import "../assets/css/Login.css"; // Importa el CSS específico

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        <form>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
        <a href="/registro">¿No tienes una cuenta? Regístrate</a>
      </div>
    </div>
  );
};

export default Login;