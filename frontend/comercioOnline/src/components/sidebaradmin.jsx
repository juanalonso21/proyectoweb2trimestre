import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import UsersPage from "../views/UsersPage";
import "../assets/css/sidebar.css";
import "boxicons/css/boxicons.min.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          <span className="fs-5 d-flex align-items-center gap-2">
            <i className="bx bx-layer fs-3" id="icono"></i>
            {isOpen && <span>BBBootstrap</span>}
          </span>
          <button className="btn btn-dark" onClick={() => setIsOpen(!isOpen)}>
            <i className="bx bx-menu fs-3"></i>
          </button>
        </div>

        <nav className="mt-4">
          <NavItem icon="bx-grid-alt" text="Dashboard" isOpen={isOpen} to="/" />
          <NavItem icon="bx-user" text="Users" isOpen={isOpen} to="/admin/usuarios" />
          <NavItem icon="bx-message-square-detail" text="Categorias" isOpen={isOpen} to="/admin/categorias" />
          <NavItem icon="bx-bookmark" text="Bookmark" isOpen={isOpen} to="/bookmark" />
          <NavItem icon="bx-folder" text="Files" isOpen={isOpen} to="/files" />
          <NavItem icon="bx-bar-chart-alt-2" text="Stats" isOpen={isOpen} to="/stats" />
        </nav>

        <div className="mt-auto">
          <NavItem icon="bx-log-out" text="Sign Out" isOpen={isOpen} to="/logout" />
        </div>
      </div>

      {/* Contenido Principal */}
      <div className={`main-content ${isOpen ? "" : "collapsed"}`}>
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
      className="nav-item"
    >
      <i className={`bx ${icon} icon`}></i>
      {isOpen && <span className="text">{text}</span>}
    </Link>
  );
};

export default Sidebar;