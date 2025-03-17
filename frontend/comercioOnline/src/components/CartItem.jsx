import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";

const CartItem = ({ product, onQuantityChange, onRemove }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          {/* Imagen del producto */}
          <Col md={2}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Col>

          {/* Información del producto */}
          <Col md={6}>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
          </Col>

          {/* Cantidad y precio */}
          <Col md={2}>
            <Form.Control
              type="number"
              value={product.quantity}
              min="1"
              onChange={(e) => onQuantityChange(product.id, e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Card.Text>${(product.price * product.quantity).toFixed(2)}</Card.Text>
          </Col>

          {/* Botón para eliminar */}
          <Col md={1}>
            <Button variant="danger" onClick={() => onRemove(product.id)}>
              Eliminar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;