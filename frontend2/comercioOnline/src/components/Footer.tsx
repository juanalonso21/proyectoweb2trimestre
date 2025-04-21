import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Sección 1: Enlaces rápidos */}
          <div className="footer-section">
            <h5 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Enlaces Rápidos</h5>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-300 transition-colors">Inicio</a></li>
              <li><a href="/productos" className="hover:text-blue-300 transition-colors">Productos</a></li>
              <li><a href="/contacto" className="hover:text-blue-300 transition-colors">Contacto</a></li>
              <li><a href="/ofertas" className="hover:text-blue-300 transition-colors">Ofertas</a></li>
            </ul>
          </div>

          {/* Sección 2: Información de contacto */}
          <div className="footer-section">
            <h5 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Contacto</h5>
            <ul className="space-y-2">
              <li className="flex items-start">
                <strong className="mr-2">Dirección:</strong> 
                <span>Calle Falsa 123, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <strong className="mr-2">Teléfono:</strong> 
                <a href="tel:+123456789" className="hover:text-blue-300 transition-colors">+123 456 789</a>
              </li>
              <li className="flex items-center">
                <strong className="mr-2">Email:</strong> 
                <a href="mailto:info@mi-ecommerce.com" className="hover:text-blue-300 transition-colors">info@mi-ecommerce.com</a>
              </li>
            </ul>
          </div>

          {/* Sección 3: Redes sociales */}
          <div className="footer-section">
            <h5 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Síguenos</h5>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={25} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={25} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={25} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={25} />
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-gray-400">
            &copy; {currentYear} Mi E-commerce. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;