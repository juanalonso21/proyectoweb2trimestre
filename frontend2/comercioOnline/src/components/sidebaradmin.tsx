import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import UsersPage from "../views/UserPage";
import { FiUsers, FiGrid, FiPackage, FiMenu, FiChevronLeft, FiLogOut } from "react-icons/fi";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
  to: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, isOpen, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        isActive 
          ? "bg-blue-100 text-blue-600" 
          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      <span className={`text-lg ${isActive ? "text-blue-600" : "text-gray-500"}`}>
        {icon}
      </span>
      {isOpen && <span className="ml-3 font-medium">{text}</span>}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg flex flex-col ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && (
            <div className="flex items-center text-xl font-semibold text-blue-600">
              <FiGrid className="mr-2" />
              <span>Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <FiChevronLeft /> : <FiMenu />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          <NavItem
            icon={<FiUsers />}
            text="Usuarios"
            isOpen={isOpen}
            to="/admin/usuarios"
            isActive={isActive('/usuarios')}
          />
          <NavItem
            icon={<FiGrid />}
            text="Categorías"
            isOpen={isOpen}
            to="/admin/categorias"
            isActive={isActive('/categorias')}
          />
          <NavItem
            icon={<FiPackage />}
            text="Productos"
            isOpen={isOpen}
            to="/admin/productos"
            isActive={isActive('/productos')}
          />
        </nav>

        <div className="p-3 border-t">
          <NavItem 
            icon={<FiLogOut />} 
            text="Cerrar Sesión" 
            isOpen={isOpen} 
            to="/logout"
            isActive={false}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/usuarios" element={<UsersPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;