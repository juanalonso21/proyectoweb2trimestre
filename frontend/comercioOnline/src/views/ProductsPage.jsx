import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductLista from "../components/ListaProductos"; // Importa el componente
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/ProductosPage.css"; // Importa el CSS

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Inicializa como array vacío
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://192.168.7.38:8090/api/producto/");
      const data = await response.json();
      console.log("Respuesta de la API (productos):", data); // Depuración
      setProducts(data); // Asume que la respuesta es un array
    } catch (error) {
      console.error("Error al cargar los productos", error);
      setProducts([]); // En caso de error, inicializa como array vacío
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://192.168.7.38/api/categoria/");
      const data = await response.json();
      console.log("Respuesta de la API (categorías):", data); // Depuración
      setCategories(data); // Asume que la respuesta es un array
    } catch (error) {
      console.error("Error al cargar las categorías", error);
      setCategories([]); // En caso de error, inicializa como array vacío
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredProducts = Array.isArray(products)
    ? products
        .filter((product) => selectedCategory === "" || product.categoria === selectedCategory)
        .sort((a, b) => (sortOrder === "asc" ? a.precio - b.precio : b.precio - a.precio))
    : [];

  return (
    <>
      <Header />
      <Container className="products-page">
        <h1 className="text-center mb-4">Productos</h1>
        <Row className="mb-4">
          <Col md={4}>
            <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.nombre}>
                  {category.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select onChange={handleSortOrderChange} value={sortOrder}>
              <option value="asc">Ordenar por precio: Menor a Mayor</option>
              <option value="desc">Ordenar por precio: Mayor a Menor</option>
            </Form.Select>
          </Col>
        </Row>
        {/* Pasa filteredProducts como una prop a ProductLista */}
        <ProductLista products={filteredProducts} />
      </Container>
      <Footer />
    </>
  );
};

export default ProductsPage;