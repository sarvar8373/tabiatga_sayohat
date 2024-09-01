import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../api/host/host";

function CustomCarousel({ images, width, height, cover }) {
  return (
    <Carousel>
      {images &&
        images.split(",").map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`${BASE_URL}/uploads/${image}`}
              alt={`Slide ${index + 1}`}
              style={{ width: width, height: height, objectFit: cover }}
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default CustomCarousel;
