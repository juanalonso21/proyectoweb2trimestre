import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = ({ carouselItems }) => {
  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item.image} alt={item.title} />
          <Carousel.Caption>
            <h5 className="txt-title-color">{item.title}</h5>
            <h6 className="txt-descrp-color">{item.description}</h6>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;