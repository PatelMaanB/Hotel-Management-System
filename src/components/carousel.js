import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "../style/carousel.css"

const BootstrapCarousel = ({ images }) => (
  <Carousel controls interval={5000} indicators={false}>
    {images.map((image, index) => (
      <Carousel.Item key={index}>
        <img src={image} alt={`lide ${index}`} className="d-block w-100 carousel-image"/>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default BootstrapCarousel;
