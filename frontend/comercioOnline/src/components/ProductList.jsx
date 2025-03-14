import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const ProductList = ({ products }) => {
  return (
    <Row className="mt-4">
      {products.map((product) => (
        <Col key={product.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="primary">Vere más...</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;