import React, { useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/CartPage.css"; // Ruta corregida

const CartPage = () => {
  // Estado inicial del carrito (puedes cargarlo desde un contexto o API)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción breve del producto 1.",
      image: "/public/img/macaco-1.jpg",
      price: 19.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción breve del producto 2.",
      image: "/public/img/macaco-3.jpg",
      price: 29.99,
      quantity: 1,
    },
  ]);

  // Función para cambiar la cantidad de un producto
  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: parseInt(newQuantity, 10) }
          : product
      )
    );
  };

  // Función para eliminar un producto
  const handleRemove = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Calcular el total de la compra
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <Container className="mt-5">
        <h1 className="text-center mb-4">Carrito de Compras</h1>

        {/* Lista de productos */}
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}

            {/* Total y botón de comprar */}
            <Row className="mt-4">
              <Col md={{ span: 6, offset: 6 }}>
                <Alert variant="success" className="text-end">
                  <h4>Total: ${total.toFixed(2)}</h4>
                </Alert>
                <Button variant="primary" size="lg" className="w-100">
                  Proceder al Pago
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Alert variant="info" className="text-center">
            <h4>Tu carrito está vacío.</h4>
          </Alert>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CartPage;