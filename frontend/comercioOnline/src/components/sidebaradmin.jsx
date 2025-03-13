import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import UsersPage from "../views/UsersPage";
import "../assets/css/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`bg-dark text-white vh-100 p-3 ${isOpen ? "w-250" : "w-75"} transition-all`}>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fs-5 d-flex align-items-center gap-2">
            <i className="bx bx-layer fs-3"></i>
            {isOpen && <span>BBBootstrap</span>}
          </span>
          <button className="btn btn-dark" onClick={() => setIsOpen(!isOpen)}>
            <i className="bx bx-menu fs-3"></i>
          </button>
        </div>

        <nav className="mt-4">
          <NavItem icon="bx-grid-alt" text="Dashboard" isOpen={isOpen} active />
          <NavItem icon="bx-user" text="Users" isOpen={isOpen} to="/usuarios" />
          <NavItem icon="bx-message-square-detail" text="Messages" isOpen={isOpen} />
          <NavItem icon="bx-bookmark" text="Bookmark" isOpen={isOpen} />
          <NavItem icon="bx-folder" text="Files" isOpen={isOpen} />
          <NavItem icon="bx-bar-chart-alt-2" text="Stats" isOpen={isOpen} />
        </nav>

        <div className="mt-auto">
          <NavItem icon="bx-log-out" text="Sign Out" isOpen={isOpen} />
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="p-4 flex-grow-1">
        <Routes>
          <Route path="/usuarios" element={<UsersPage />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </div>
  );
};

// Componente de ítem del sidebar
const NavItem = ({ icon, text, isOpen, to }) => {
  return (
    <Link
      to={to || "#"}
      className={`d-flex align-items-center gap-2 p-2 text-white text-decoration-none rounded 
        ${window.location.pathname === to ? "bg-primary" : "hover-bg-light"} ${!isOpen ? "hide-text" : ""}`}
    >
      <i className={`bx ${icon} fs-4 nav_icon`}></i>
      {isOpen && <span className="nav_text">{text}</span>}
    </Link>
  );
};

export default Sidebar;