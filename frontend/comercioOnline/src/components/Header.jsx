import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa"; // Importa íconos de react-icons
import "../assets/css/Header.css"; // Importa el CSS personalizado

const Header = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualiza el estado con el valor del input
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data); // Actualiza el estado con los resultados
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <>
      {/* Header principal */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="custom-header">
        <Container>
          {/* Logo o nombre de la marca */}
          <Navbar.Brand href="/">
            <img
              src="/public/img/Logo.png"
              width="65"
              height="65"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>

          {/* Botón para colapsar el menú en pantallas pequeñas */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Menú de navegación */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Buscador */}
            <Form className="d-flex custom-search" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Buscar productos..."
                className="me-5"
                aria-label="Buscar"
                value={searchTerm} // Valor controlado por el estado
                onChange={handleSearchChange} // Maneja cambios en el input
              />
              <Button variant="outline-light" type="submit">Buscar</Button>
            </Form>

            {/* Íconos de carrito y usuario */}
            <Nav className="custom-icons">
              <Nav.Link href="/carrito">
                <FaShoppingCart size={35} /> {/* Ícono de carrito */}
              </Nav.Link>
              <Nav.Link href="/login">
                <FaRegUserCircle size={35} /> {/* Ícono de usuario */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de enlaces de navegación */}
      <Navbar bg="light" expand="lg" className="custom-links">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/ofertas">Ofertas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((product) => (
            <div key={product.id} className="search-result-item">
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;