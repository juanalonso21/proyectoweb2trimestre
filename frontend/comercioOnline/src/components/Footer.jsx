import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../assets/css/Footer.css"; // Importa el CSS personalizado

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Sección 1: Enlaces rápidos */}
          <Col md={4} className="footer-section">
            <h5>Enlaces Rápidos</h5>
            <ul className="footer-links">
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/ofertas">Ofertas</a></li>
            </ul>
          </Col>

          {/* Sección 2: Información de contacto */}
          <Col md={4} className="footer-section">
            <h5>Contacto</h5>
            <ul className="footer-contact">
              <li><strong>Dirección:</strong> Calle Falsa 123, Ciudad, País</li>
              <li><strong>Teléfono:</strong> +123 456 789</li>
              <li><strong>Email:</strong> info@mi-ecommerce.com</li>
            </ul>
          </Col>

          {/* Sección 3: Redes sociales */}
          <Col md={4} className="footer-section">
            <h5>Síguenos</h5>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={25} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={25} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={25} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={25} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Derechos de autor */}
        <Row>
          <Col className="text-center mt-4">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Mi E-commerce. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;