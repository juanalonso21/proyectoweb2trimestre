import React from "react";
import { Container } from "react-bootstrap";
import CarouselComponent from "../components/CarouselComponent";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/HomePage.css"; // Ruta corregida
import pageData from "../data/pageData.json"; // Importa el JSON
import "../assets/css/styles.css"; // Importa el CSS personalizado
const HomePage = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <Container className="mt-5">
        <h1 className="text-center mb-4">{pageData.pageTitle}</h1>

        {/* Carrusel */}
        <CarouselComponent carouselItems={pageData.carousel} />

        {/* Productos destacados */}
        <h2 className="text-center mb-4">Principales categorías</h2>
        <ProductList products={pageData.featuredProducts} />
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;