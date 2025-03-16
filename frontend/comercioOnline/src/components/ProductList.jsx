import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../assets/css/ProductCard.css"; // Importa el CSS

const ProductList = ({ products }) => {
  return (
    <Row className="mt-4">
      {products.length === 0 ? (
        <Col>
          <p>No hay productos disponibles</p>
        </Col>
      ) : (
        products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="text-center product-card"> {/* Aplica la clase product-card */}
              <div className="product-image-container-principal"> {/* Contenedor de la imagen */}
                {product.imagenUrl && (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8090/img/${product.imagenUrl}`} // Ruta de la imagen desde la API
                    alt={product.nombre}
                    className="image-principal"
                  />
                )}
              </div>
              <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>{product.descripcion}</Card.Text>
                <Card.Text>Precio: ${product.precio}</Card.Text>
                <Button variant="primary">Ver más...</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default ProductList;