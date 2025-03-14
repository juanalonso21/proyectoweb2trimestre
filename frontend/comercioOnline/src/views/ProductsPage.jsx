import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/producto/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/categoria/");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar las categorías", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredProducts = products
    .filter(product => selectedCategory === "" || product.category === selectedCategory)
    .sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h1 className="text-center mb-4">Productos</h1>
        <Row className="mb-4">
          <Col md={4}>
            <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
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
        <Row>
          {filteredProducts.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductsPage;