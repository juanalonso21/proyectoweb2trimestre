import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = ({ carouselItems }) => {
  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-50" src={item.image} alt={item.title} />
          <Carousel.Caption>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;