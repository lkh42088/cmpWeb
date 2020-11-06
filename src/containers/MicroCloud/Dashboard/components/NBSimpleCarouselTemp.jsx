import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col} from "reactstrap";
import Slider from "react-slick";

import Carousel from 'react-multi-carousel';
import {NavLink} from "react-router-dom";
import 'react-multi-carousel/lib/styles.css';

import {OPERATOR} from "../../../../lib/var/globalVariable";
import {getMcVms} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

import NBVmSmallCard from "./NBVmSmallCard";

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

const NBSimpleCarouselTemp = (props) => {
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
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        rows: 1,
        slidesToShow: 4,
        slidesToScroll: 1,
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
        <div className="nb-carousel-container">
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
                <Col md={12} lg={12} xs={12} sm={12} xl={12} style={{padding: 10}}>
                    <div style={{
                        border: "1px solid red",
                        display: "block",
                    }}>
                        {/*<Slider {...settings}>
                            {vms.map(vm => (
                                <div>
                                    <NavLink
                                        to="/micro/vms"
                                        key={vm.name}
                                        onClick={e => handleView(vm)}
                                    >
                                        <NBVmSmallCard vm={vm}/>
                                    </NavLink>
                                </div>
                            ))}
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
                        </Slider>*/}
                        <section id="features">
                            <div className="content">
                                <div className="slider responsive">
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
                                    </Slider>
                                </div>
                            </div>
                        </section>
                    </div>
                </Col>
            )}
        </div>
    );
};

export default NBSimpleCarouselTemp;
