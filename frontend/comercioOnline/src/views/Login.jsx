import React, { useState } from "react";
import axios from "axios";
import "../assets/css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/api/usuario/login", { username, password });
      const { data } = response;
      if (data.success) {
        // Guardar la información del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        setError("");
        console.log("Login exitoso:", data.user);
        // Redirigir al usuario a la página principal o a la página correspondiente
        window.location.href = "/"; // Cambia esto a la ruta que desees
      } else {
        setError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center rounded bg-light">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Ingrese su username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;