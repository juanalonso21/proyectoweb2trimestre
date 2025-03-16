import React from "react";
import { Card, Button } from "react-bootstrap";
<<<<<<< HEAD
import "../assets/css/ProductCard.css"; // Asegúrate de que la ruta sea correcta

=======
import "../assets/css/ProductCard.css"; 
>>>>>>> 5690f236fd94db8a1914a3181ff13e136601948d
const ProductCard = ({ product }) => {
  const imageUrl = `/public/img/${product.imagenUrl}`; // Ruta de la imagen

  return (
    <Card className="mb-4 product-card">
      <div className="product-image-container">
        <Card.Img variant="top" src={imageUrl} className="product-image" />
      </div>
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
        <Card.Text className="product-description">{product.descripcion}</Card.Text>
        <Card.Text>${product.precio.toFixed(2)}</Card.Text>
        <Button variant="primary">Añadir al Carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;