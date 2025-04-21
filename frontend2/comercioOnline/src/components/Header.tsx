import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaShoppingCart, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IProduct from "@/model/interfaces/iProduct";
import { searchProducts } from "@/model/api/apiProducts";


const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    // Redirige a la página de productos con el término de búsqueda como parámetro
    navigate(`/productos?search=${encodeURIComponent(searchTerm)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResultClick = (productId: number) => {
    navigate(`/productos/${productId}`); // Navega a la página del producto seleccionado
    setSearchResults([]); // Limpia los resultados de búsqueda
    setSearchTerm(""); // Limpia el término de búsqueda
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Header principal */}
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="/src/assets/img/Logo.png"
                  width="65"
                  height="65"
                  className="h-16 w-16 object-contain"
                  alt="Logo"
                />
              </a>
            </div>

            {/* Menú para desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Buscador */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="search"
                  placeholder="Buscar productos..."
                  className="py-2 px-4 pr-10 rounded-full text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  <FaSearch />
                </button>
              </form>

              {/* Íconos */}
              <div className="flex items-center space-x-4">
                <a href="/carrito" className="hover:text-blue-400 transition-colors" aria-label="Carrito">
                  <FaShoppingCart size={24} />
                </a>
                <a href="/login" className="hover:text-blue-400 transition-colors" aria-label="Usuario">
                  <FaRegUserCircle size={24} />
                </a>
              </div>
            </div>

            {/* Botón móvil */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="search"
                  placeholder="Buscar productos..."
                  className="py-2 px-4 pr-10 rounded-full text-blue-300 focus:outline-none w-full"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  <FaSearch />
                </button>
              </form>

              <div className="flex justify-center space-x-6">
                <a href="/carrito" className="hover:text-blue-400 transition-colors">
                  <FaShoppingCart size={24} />
                </a>
                <a href="/login" className="hover:text-blue-400 transition-colors">
                  <FaRegUserCircle size={24} />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Barra de navegación secundaria */}
      <nav className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex justify-center space-x-8 py-3">
            <a href="/" className="hover:text-blue-400 transition-colors py-2">Inicio</a>
            <a href="/productos" className="hover:text-blue-400 transition-colors py-2">Productos</a>
            <a href="/contacto" className="hover:text-blue-400 transition-colors py-2">Contacto</a>
            <a href="/ofertas" className="hover:text-blue-400 transition-colors py-2">Ofertas</a>
          </div>
        </div>
      </nav>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-b-lg max-h-96 overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => handleResultClick(product.id)} // Navega al producto seleccionado
            >
              <h3 className="font-semibold">{product.nombre}</h3>
              <p className="text-gray-600">{product.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;