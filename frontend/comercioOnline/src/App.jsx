import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductsPageAdmin from "./views/ProductsPageAdmin";
import Login from "./views/Login";
import SignIn from "./views/SingIn";
import HomePage from "./views/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductsPage from "./views/ProductsPage";
import Admin from "./admin/Admin";
<<<<<<< HEAD
import UsersPage from "./views/UsersPage";
import "./assets/css/styles.css";
=======
import UsersPageAdmin from "./views/UsersPageAdmin";
import CategoriasPageAdmin from "./views/CategoriasPageAdmin";

>>>>>>> 5690f236fd94db8a1914a3181ff13e136601948d
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute>
              <UsersPageAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <ProductsPageAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categorias"
          element={
            <ProtectedRoute>
              <CategoriasPageAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

