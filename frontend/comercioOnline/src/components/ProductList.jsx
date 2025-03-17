import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../assets/css/ProductCard.css"; // Importa el CSS

const ProductList = ({ products }) => {
  return (
    <Row className="mt-4">
      {products.map((product) => (
        <Col key={product.id} md={4} className="mb-4">
          <Card className="text-center product-card"> {/* Aplica la clase product-card */}
            <div className="product-image-container-principal"> {/* Contenedor de la imagen */}
              <Card.Img variant="top" src={product.image} className="image-principal" /> {/* Aplica la clase product-image */}
            </div>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="primary">Ver más...</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;