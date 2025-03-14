import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa"; // Importa íconos de react-icons
import "../css/Header.css"; // Importa el CSS personalizado


const Header = () => {
  return (
    <>
      {/* Header principal */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
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
            <Form className="d-flex mx-auto w-75">
              <FormControl
                type="search"
                placeholder="Buscar productos..."
                className="me-5"
                aria-label="Buscar"
              />
              <Button variant="outline-light">Buscar</Button>
            </Form>

            {/* Íconos de carrito y usuario */}
            <Nav className="ms-auto">
              <Nav.Link href="/carrito">
                <FaShoppingCart size={35} /> {/* Ícono de carrito */}
              </Nav.Link>
              <Nav.Link href="/usuario">
                <FaRegUserCircle size={35} /> {/* Ícono de usuario */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de enlaces de navegación */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/ofertas">Ofertas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;