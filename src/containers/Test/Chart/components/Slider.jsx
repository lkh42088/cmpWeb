import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Card, CardBody, CardHeader, Col, Row,
} from "reactstrap";
import Carousel from 'react-multi-carousel';
import {NavLink} from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import 'react-multi-carousel/lib/styles.css';
/*import '../../../../scss/plus/slick.css';
import '../../../../scss/plus/slick-theme.css';*/
import {OPERATOR} from "../../../../lib/var/globalVariable";
import {getMcVms} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
            }}
            onClick={onClick}
        />
    );
}

const SliderComponent = () => {
    const settings2 = {
        // 아래 dots 줄 것인가
        dots: true,
        // 좌우 화살표 줄 것인가
        arrows: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        infinite: true,
        speed: 2000,
        rows: 1,
        slidesToShow: 2,
        slidesToScroll: 1,
        // 자동 넘김을 할 것인가. 한다면 스피드는?
        /*autoplay: true,
        autoplaySpeed: 4000,*/
        // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
        pauseOnHover: true,
        // 슬라이더를 넘기지 않고 fade in/out 하는 식으로 트랜지션 됨
        fade: true,
        // 레이지 로딩할 거야?
        lazyLoad: true,
        // dots를 감싸고 있는
        /*appendDots: dots => (
            <div
                style={{
                    padding: "50px",
                    color: "pink",
                    background: "green",
                }}
            >
                <ul style={{
                    margin: "0px",
                    color: "red",
                    background: "blue",
                }}> {dots} </ul>
            </div>
        ),*/
    };
    const settings = {
        // 아래 dots 줄 것인가
        dots: true,
        // 좌우 화살표 줄 것인가
        arrows: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        infinite: false,
        speed: 2000,
        rows: 1,
        slidesToShow: 4,
        slidesToScroll: 1,
        // 자동 넘김을 할 것인가. 한다면 스피드는?
        /*autoplay: true,
        autoplaySpeed: 4000,*/
        // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
        pauseOnHover: true,
        // 슬라이더를 넘기지 않고 fade in/out 하는 식으로 트랜지션 됨
        fade: false,
        // 레이지 로딩할 거야?
        lazyLoad: true,
        // dots를 감싸고 있는
        /*appendDots: dots => (
            <div
                style={{
                    padding: "50px",
                    color: "pink",
                    background: "green",
                }}
            >
                <ul style={{
                    margin: "0px",
                    color: "red",
                    background: "blue",
                }}> {dots} </ul>
            </div>
        ),*/
    };

    return (
        <Slider {...settings}>
            <div>
                <Card className="nb-card-carousel" style={{
                    borderRadius: "10px",
                }}>
                    <CardHeader className="vm__card_header">
                        00.name
                    </CardHeader>
                    <CardBody className="vm__card-carousel"
                              style={{
                                  background: "#00bcd4",
                              }}>
                        <div className="vm__stats_border-none">
                            <div className="vm__stat_border-none">
                                <div className="vm__stat-title">
                                    <p>00.1</p>
                                </div>
                                <div className="vm__stat-carousel-on">
                                    <p>00.2</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="nb-card-carousel" style={{
                    borderRadius: "10px",
                }}>
                    <CardHeader className="vm__card_header">
                        11.name
                    </CardHeader>
                    <CardBody className="vm__card-carousel"
                              style={{
                                  background: "#2b580c",
                              }}>
                        <div className="vm__stats_border-none">
                            <div className="vm__stat_border-none">
                                <div className="vm__stat-title">
                                    <p>11.1</p>
                                </div>
                                <div className="vm__stat-carousel-on">
                                    <p>11.2</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="nb-card-carousel" style={{
                    borderRadius: "10px",
                }}>
                    <CardHeader className="vm__card_header">
                        22.name
                    </CardHeader>
                    <CardBody className="vm__card-carousel"
                              style={{
                                  background: "#ff1e56",
                              }}>
                        <div className="vm__stats_border-none">
                            <div className="vm__stat_border-none">
                                <div className="vm__stat-title">
                                    <p>22.1</p>
                                </div>
                                <div className="vm__stat-carousel-on">
                                    <p>22.2</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="nb-card-carousel" style={{
                    borderRadius: "10px",
                }}>
                    <CardHeader className="vm__card_header">
                        22.name
                    </CardHeader>
                    <CardBody className="vm__card-carousel"
                              style={{
                                  background: "#ad62aa",
                              }}>
                        <div className="vm__stats_border-none">
                            <div className="vm__stat_border-none">
                                <div className="vm__stat-title">
                                    <p>22.1</p>
                                </div>
                                <div className="vm__stat-carousel-on">
                                    <p>22.2</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card className="nb-card-carousel" style={{
                    borderRadius: "10px",
                }}>
                    <CardHeader className="vm__card_header">
                        22.name
                    </CardHeader>
                    <CardBody className="vm__card-carousel"
                              style={{
                                  background: "#ffe75e",
                              }}>
                        <div className="vm__stats_border-none">
                            <div className="vm__stat_border-none">
                                <div className="vm__stat-title">
                                    <p>22.1</p>
                                </div>
                                <div className="vm__stat-carousel-on">
                                    <p>22.2</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Slider>
    );
};

export default SliderComponent;
