import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product }) => {
  return (
    <Card className="mb-4 product-card">
      <div className="product-image-container">
        <Card.Img variant="top" src={product.image} className="product-image" />
      </div>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price.toFixed(2)}</Card.Text>
        <Button variant="primary">Añadir al Carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;