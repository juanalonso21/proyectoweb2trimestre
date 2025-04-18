import React, { useState } from "react";
import axios from "axios";
import "../assets/css/login.css";
import IUser from "../model/interfaces/iUser"; // Importa la interfaz de usuario

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const baseURL = window.location.hostname === "localhost"
    ? "http://localhost:8090/api"
    : "http://your-ip-address:8090/api";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear el objeto del usuario basado en la interfaz
    const newUser: IUser = {
      username,
      email,
      password,
      nombre,
      estado: "ACTIVO",
      rol: "USUARIO",
      fechaCreacion: new Date().toISOString(),
      ultimoLogin: null,
      token: "",
      intentosLogin: 0,
      avatarUrl: "",
    };

    try {
      const response = await axios.post<IUser>(`${baseURL}/usuario/create`, newUser);
      const { data } = response;

      if (data) {
        setSuccess("Usuario creado exitosamente. Ahora puedes iniciar sesión.");
        setError("");
      } else {
        setError("Error al crear el usuario. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setError("Error al crear el usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center rounded bg-light login-container">
      <div className="card p-4 shadow-lg login-card">
        <h2 className="text-center mb-4">Registro</h2>
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
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;