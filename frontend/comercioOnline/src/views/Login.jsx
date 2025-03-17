import React, { useState } from "react";
import "../assets/css/login.css"; // Importa el CSS específico
import { loginUser } from "../api/usersapi"; // Asegúrate de importar tu función de login

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar los errores
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación simple antes de enviar
    if (!username || !password) {
      setErrorMessage("Por favor, ingresa ambos campos.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Limpiar mensajes de error previos

    const userData = { username, password };

    try {
      // Llamada a la API para hacer el login
      const response = await loginUser(userData);
      
      if (response.success) {
        // Si el login es exitoso, guardar los datos del usuario y redirigir
        localStorage.setItem("user", JSON.stringify(response.user)); // Guarda los datos del usuario
        window.location.href = "/dashboard"; // Redirige a la página de admin o dashboard
      } else {
        setErrorMessage("Credenciales incorrectas. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al realizar el login:", error);
      setErrorMessage("Hubo un problema al iniciar sesión. Intenta más tarde.");
    } finally {
      setLoading(false); // Detener el estado de carga
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-container">
      <div className="card p-4 shadow-lg login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        <a href="/singin">¿No tienes una cuenta? Regístrate</a>
      </div>
    </div>
  );
};

export default Login;
