"use client";

import React from "react";
import { Carousel, Image } from "react-bootstrap";

const CarouselComponent = ({ items, interval = 3000 }) => {
  return (
    <Carousel interval={interval} controls={true} indicators={true}>
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <Image
            src={item.image}
            alt={item.caption || `Slide ${index + 1}`}
            fluid
            className="d-block w-100"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          {item.caption && (
            <Carousel.Caption>
              <h3>{item.caption}</h3>
              {item.description && <p>{item.description}</p>}
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
