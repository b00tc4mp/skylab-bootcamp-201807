import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import 'react-accessible-accordion/dist/fancy-example.css';
import Slider from "react-slick";

class Carousel extends Component {
    
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 8000,
            autoplaySpeed: 3000,
        };
        return <Slider {...settings}>
                <div>
                    <img alt="" className="carousel image02" />
                </div>
                <div>
                    <img alt="" className="carousel image01" />
                </div>
                <div>
                    <img alt="" className="carousel image03" />
                </div>
                <div>
                    <img alt="" className="carousel image04" />
                </div>
            </Slider>
    }
}
export default withRouter(Carousel)