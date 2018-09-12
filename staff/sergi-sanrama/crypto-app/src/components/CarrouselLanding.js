import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
    {
      src: './images/carrousel1.png',
    },
    {
      src: './images/carrousel2.png',
    },
    {
      src: './images/carrousel3.jpg',
    }
  ]

const CarrouselLanding = () => <UncontrolledCarousel items={items} />

export default CarrouselLanding