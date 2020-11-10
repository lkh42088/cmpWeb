import React, {Fragment, useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-multi-carousel';
import {NavLink} from "react-router-dom";
import Slider from "react-slick";
import 'react-multi-carousel/lib/styles.css';

import {OPERATOR} from "../../../../lib/var/globalVariable";
import {getMcVms} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";
import NBVmSmallCard from "./NBVmSmallCard";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        paritialVisibilityGutter: 20,
        // slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        paritialVisibilityGutter: 50,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30,
    },
};

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

const _NBSimpleCarouselTemp = (props) => {
    const dispatch = useDispatch();
    const {cpName, vmCount} = props;
    const [vms, setVms] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const {
        rowsPerPage,
        currentPage,
        orderBy,
        order,
    } = useSelector(({pagingRd}) => ({
        rowsPerPage: pagingRd.rowsPerPage,
        currentPage: pagingRd.currentPage,
        totalPage: pagingRd.totalPage,
        orderBy: pagingRd.orderBy,
        order: pagingRd.order,
    }));

    const settings = {
        // 아래 dots 줄 것인가
        /*dots: true,*/
        // 좌우 화살표 줄 것인가
        arrows: true,
        /*nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,*/
        infinite: false,
        speed: 1000,
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
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
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

    const handleView = (val) => {
        dispatch(changeVmPage({
            pageType: 'page',
            data: val,
        }));
    };

    const getPageData = async () => {
        console.log("getPageData start!");
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        // let companyName;
        // if (user.level <= OPERATOR) { //관리자
        // companyName = "all";
        // } else {
        //     companyName = user.cpName;
        const companyName = user.cpName;
        // }
        try {
            const response = await getMcVms({
                rows: rowsPerPage,
                offset,
                orderBy,
                order,
                cpName: companyName,
            });
            setVms(response.data.data);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    useEffect(() => {
        if (vms.length > 0 && vms.length < 4) {
            responsive.desktop.items = vms.length;
        }
    }, [vms]);

    useEffect(() => {

    }, [cpName]);

    useEffect(() => {
        getPageData();
    }, []);

    return (
        <div>
            {vmCount === 0 ? (
                <Fragment>
                    <p style={{
                        textAlign: "center",
                        margin: "40px auto",
                    }}>
                            <span style={{
                                fontSize: "1.3rem",
                                color: "red",
                            }}>
                                NO DATA
                            </span>
                        <br/>
                        <span textAnchor="middle"
                              style={{
                                  fontSize: "0.8rem",
                              }}>
                                데이터가 없습니다.
                            </span>
                    </p>
                </Fragment>
            ) : (
                <Slider {...settings}>
                    {vms.map(vm => (
                        <NavLink
                            to="/micro/vms"
                            key={vm.name}
                            onClick={e => handleView(vm)}
                        >
                            <NBVmSmallCard vm={vm}/>
                        </NavLink>
                    ))}
                    <div>
                        <Card className="nb-card-carousel-slick">
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
                        <Card className="nb-card-carousel-slick">
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
                        <Card className="nb-card-carousel-slick">
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
                </Slider>
                /*<Carousel
                    ssr
                    // partialVisbile
                    deviceType="desktop"
                    responsive={responsive}
                    showDots
                    infinite
                    keyBoardControl
                    customTransition="all .5"
                    transitionDuration={100}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {vms.map(vm => (
                        <NavLink
                            to="/micro/vms"
                            key={vm.name}
                            onClick={e => handleView(vm)}
                        >
                            <NBVmSmallCard vm={vm}/>
                        </NavLink>
                    ))}
                </Carousel>*/
            )}
        </div>
    );
};

export default _NBSimpleCarouselTemp;
