import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-multi-carousel';
import {NavLink} from "react-router-dom";
import {OPERATOR} from "../../../../lib/var/globalVariable";
import {getMcVms} from "../../../../lib/api/microCloud";
import 'react-multi-carousel/lib/styles.css';
import NBVmSmallCard from "./NBVmSmallCard";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

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

const NBSimpleCarousel = (props) => {
    const dispatch = useDispatch();
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
        let companyName;
        if (user.level <= OPERATOR) { //관리자
            companyName = "all";
        } else {
            companyName = user.cpName;
        }
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

    // useEffect(() => {
    //     if (vms.length !== 0) {
    //         responsive.desktop.items = vms.length;
    //     }
    // }, [vms]);

    useEffect(() => {
        getPageData();
    }, []);

    return (
        <div className="nb-carousel-container">
            <Carousel
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
                        onClick={e => handleView(vm)}
                    >
                        <NBVmSmallCard vm={vm}/>
                    </NavLink>
                    ))}
            </Carousel>
        </div>
    );
};

export default NBSimpleCarousel;
