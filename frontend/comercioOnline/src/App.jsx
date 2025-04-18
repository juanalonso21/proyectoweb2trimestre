import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Asegúrate de importar Routes y Route
import Sidebar from "./components/sidebaradmin";
import Login from "./views/login";
import SignIn from "./views/SingIn";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute component={Sidebar} />} />
        {/* Agrega más rutas según sea necesario */}
        <Route path="/signin" component={SignIn} />
        
      <Redirect from="*" to="/" />
      </Routes>
    </Router>
  );
};

export default App;

