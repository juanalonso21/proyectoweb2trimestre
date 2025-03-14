import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const imageUrl = `/assets/img/${product.imagenUrl}`; // Ruta de la imagen

  return (
    <Card className="mb-4 product-card">
      <div className="product-image-container">
        <Card.Img variant="top" src={imageUrl} className="product-image" />
      </div>
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text>{product.descripcion}</Card.Text>
        <Card.Text>${product.precio.toFixed(2)}</Card.Text>
        <Button variant="primary">Añadir al Carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;