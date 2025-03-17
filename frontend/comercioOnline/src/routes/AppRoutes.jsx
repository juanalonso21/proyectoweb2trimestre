import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersPage from "../views/UsersPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/usuarios" element={<UsersPage />} />
      {/* Agrega más rutas según sea necesario */}
    </Routes>
  );
};

export default AppRoutes;