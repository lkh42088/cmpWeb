import React, {Fragment, useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-multi-carousel';
import {NavLink} from "react-router-dom";
import Slider from "react-slick";
import 'react-multi-carousel/lib/styles.css';
import {makeStyles} from "@material-ui/core/styles";
import LoadingIcon from "mdi-react/LoadingIcon";

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

const useStyles = makeStyles(theme => ({
    dotStyle: {
        color: "yellow",
        "&:before": {
            color: "red",
        },
        "&:active": {
            color: "hotpink",
        },
        "&:hover": {
            color: "skyblue",
        },
    },
}));

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

const NBSimpleCarousel = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {cpName, vmCount} = props;
    const [vms, setVms] = useState([]);
    const [loading, setLoading] = useState(true);
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
        dots: true,
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

    const handleView = (val) => {
        dispatch(changeVmPage({
            pageType: 'page',
            data: val,
        }));
    };

    const getPageData = async () => {
        console.log("NBSimpleCarousel getPageData start!");
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        let companyName = "";
        // let companyName;
        if (user.level <= OPERATOR) { //관리자일 경우
            companyName = cpName; // 선택한 값
        } else {
            companyName = user.cpName; // 로그인한 사용자의 회사
        }

        console.log("user.cpName : ", user.cpName);
        console.log("cpName : ", cpName);
        console.log("FINAL - companyName : ", companyName);

        try {
            const response = await getMcVms({
                rows: rowsPerPage,
                offset,
                orderBy,
                order,
                cpName: companyName,
            });
            setVms(response.data.data);
            setLoading(false);
        } catch (e) {
            console.log("NBSimpleCarousel getPageData error!");
        }
    };

    useEffect(() => {
        if (vms.length > 0 && vms.length < 4) {
            responsive.desktop.items = vms.length;
        }
        console.log("useEffect vms : ", vms);
    }, [vms]);

    useEffect(() => {
        setLoading(true);
        setVms([]);
        getPageData();
    }, [cpName]);

    /*useEffect(() => {
        console.log("useEffect ~!~~!!!");
        getPageData();
    }, []);*/

    return (
        <div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? <div className="panel__refresh"><LoadingIcon /></div> : ""}
            {vms.length === 0 ? (
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
                </Slider>
            )}
        </div>
    );
};

export default NBSimpleCarousel;
