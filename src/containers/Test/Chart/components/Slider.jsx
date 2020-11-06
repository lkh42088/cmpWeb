import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "reactstrap";
import Carousel from 'react-multi-carousel';
import {NavLink} from "react-router-dom";
import Slider from "react-slick";
import 'react-multi-carousel/lib/styles.css';

import {OPERATOR} from "../../../../lib/var/globalVariable";
import {getMcVms} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024,
        },
        items: 4,
        paritialVisibilityGutter: 20,
        // slidesToSlide: 3,
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464,
        },
        items: 3,
        paritialVisibilityGutter: 50,
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0,
        },
        items: 1,
        paritialVisibilityGutter: 30,
    },
};

const SliderComponent = (props) => {
    const dispatch = useDispatch();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <h2> Responsive </h2>
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
                <div>
                    <h3>7</h3>
                </div>
                <div>
                    <h3>8</h3>
                </div>
            </Slider>
        </div>
    );
};

export default SliderComponent;
