import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard"; // Reutilizamos el componente de tarjeta
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/ProductosPage.css";

const ProductosPage = () => {
  // Datos de ejemplo para los productos
  const products = [
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción breve del producto 1.",
      image: "https://via.placeholder.com/300",
      price: 19.99,
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción breve del producto 2.",
      image: "https://via.placeholder.com/400",
      price: 29.99,
    },
    {
      id: 3,
      name: "Producto 3",
      description: "Descripción breve del producto 3.",
      image: "https://via.placeholder.com/500",
      price: 39.99,
    },
    {
      id: 4,
      name: "Producto 4",
      description: "Descripción breve del producto 4.",
      image: "https://via.placeholder.com/600",
      price: 49.99,
    },
  ];

  return (
    <>
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <Container className="mt-5">
        <h1 className="text-center mb-4">Nuestros Productos</h1>

        {/* Lista de productos */}
        <Row>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductosPage;