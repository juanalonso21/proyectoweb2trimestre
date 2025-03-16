import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Asegúrate de importar Navigate
import Sidebar from "./components/sidebaradmin";
import Login from "./views/login";
import SignIn from "./views/SingIn";
import HomePage from "./views/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductsPage from "./views/ProductsPage";
import Admin from "./admin/Admin";
import UsersPage from "./views/UsersPage";
import "./assets/css/styles.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        {/* Agrega más rutas según sea necesario */}
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/usuarios" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirige todas las rutas no definidas a HomePage */}
      </Routes>
    </Router>
  );
};

export default App;

