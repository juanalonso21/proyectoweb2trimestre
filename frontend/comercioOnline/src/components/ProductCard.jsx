import React from "react";
import { Card, Button } from "react-bootstrap";
import "../assets/css/ProductCard.css"; // Importa el CSS

const ProductCard = ({ product }) => {
  return (
    <Card className="text-center product-card">
      <div className="product-image-container">
        <Card.Img variant="top" src={product.imagenUrl} className="product-image" />
      </div>
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text>{product.descripcion}</Card.Text>
        <Card.Text>Precio: ${product.precio}</Card.Text>
        <Button variant="primary">Ver más...</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;