import React from "react";
import { Container } from "react-bootstrap";
import CarouselComponent from "../components/CarouselComponent";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer";
<<<<<<< HEAD
import Contact from "../components/Contact";
import pageData from "../data/PageData.json"; // Importa el JSON
=======
import "../assets/css/HomePage.css"; // Ruta corregida
>>>>>>> 5690f236fd94db8a1914a3181ff13e136601948d
import "../assets/css/styles.css"; // Importa el CSS personalizado
import "../assets/css/HomePage.css"; // Ruta corregida
const HomePage = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <Container className="mt-5">
        <h1 className="text-center mb-4 txt-color">{pageData.pageTitle}</h1>

        {/* Carrusel */}
        <CarouselComponent carouselItems={pageData.carousel} />

        <p className="text-center mb-4">{pageData.page}</p>

        {/* Productos destacados */}
        <h2 className="text-center mb-4">Principales categorías</h2>
        <ProductList products={pageData.featuredProducts} />
      </Container>

      {/* Contacto */}
      

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;