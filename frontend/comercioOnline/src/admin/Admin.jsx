import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebaradmin";
import "../assets/css/Admin.css";
function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-4">
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {user.username}!</h2>
            <p className="text-lg">Estas logueado en el panel de admin</p>
          </div>
        ) : (
          <p className="text-lg">Por favor inicia sesion para continuar</p>
        )}
      </div>
    </div>
  );
}

export default Admin;