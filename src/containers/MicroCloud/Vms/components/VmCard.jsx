import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Badge,
    Card, CardBody, Col, Container, Progress, Row, CardHeader,
} from 'reactstrap';
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
    ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {NavLink} from "react-router-dom";
import {Icon} from "@iconify/react";
import {Tooltip as TooltipMat} from "@material-ui/core";

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ListIcon from "@material-ui/icons/List";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from '@material-ui/icons/Settings';
import Link from "@material-ui/core/Link";

import getTooltipStyles from "../../../../shared/helpers";
import {getMcVms} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";

const WindowsImg = `${process.env.PUBLIC_URL}/img/OS_Windows.ico`;
const LinuxImg = `${process.env.PUBLIC_URL}/img/OS_Linux.ico`;

const dataTemp = [
    {
        name: '12',
        uv: 4000,
    },
    {
        name: '13',
        uv: 3000,
    },
    {
        name: '14.03',
        uv: 2000,
    },
    {
        name: '15.03',
        uv: 2780,
    },
    {
        name: '16.03',
        uv: 1890,
    },
    {
        name: '17.03',
        uv: 2390,
    },
    {
        name: '18.03',
        uv: 3490,
    },
    {
        name: '19.03',
        uv: 3490,
    },
    {
        name: '20',
        uv: 3490,
    },
    {
        name: '21.5',
        uv: 3490,
    },
];

const BounceRateArea = ({themeName}) => (
    <ResponsiveContainer height={150}>
        <AreaChart
            data={dataTemp}
            margin={{
                top: 0,
                right: 0,
                left: -15,
                bottom: 0,
            }}
        >
            <XAxis dataKey="name" tickLine={false}/>
            <YAxis tickLine={false}/>
            <CartesianGrid vertical={false}/>
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Area type="monotone" dataKey="uv" stroke="#5ca0d3" fill="#5ca0d3" fillOpacity={0.2}/>
        </AreaChart>
    </ResponsiveContainer>
);

const VmCardContent = (props) => {
    const {row} = props;
    const dispatch = useDispatch();

    const handleView = (val) => {
        dispatch(changeVmPage({
            pageType: 'page',
            data: row,
        }));
    };

    // eslint-disable-next-line consistent-return
    const dpOsImage = (os) => {
        switch (os) {
            case "win10":
                return (<img className="vm__os-img" src={WindowsImg} alt="os"/>);
            case "linux":
                return (<img className="vm__os-img" src={LinuxImg} alt="os"/>);
            default:
                break;
        }
    };

    return (
        <Col md={12} lg={12} xl={3} style={{padding: "0 10px 20px 10px"}}>
            <Card className="vm__card-main">
                <CardHeader
                    className={row.currentStatus === 'running'
                        ? "vm__card_header-running" : "vm__card_header"}
                >
                    {row.name}
                    <NavLink
                        to="/micro/vms"
                        onClick={event => handleView(row.idx)}
                        activeClassName="cb_sidebar__link-active"
                    >
                        <TooltipMat title="상세">
                            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                            <i className="vm__card_i">&nbsp;&nbsp;<DesktopWindowsIcon/></i>
                        </TooltipMat>
                    </NavLink>
                </CardHeader>
                <CardBody className="vm__card">
                    {/*<div className="vm__stats">
                        <div className="vm__stat">
                            <div className="vm__stat-mainTitle">
                                <img className="vm__os-img" src={OsImg} alt="os"/>
                                &nbsp;{row.name}
                            </div>
                        </div>
                    </div>*/}

                    {/*<div className="vm__stats">
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">
                                &nbsp;
                            </div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-mainTitle">
                                <img className="vm__os-img" src={OsImg} alt="os"/>&nbsp;{row.name}</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-graph">
                                <ul className="social-icons">
                                    <li style={{
                                        bottom: "10px",
                                    }}>
                                        <NavLink
                                            to="/micro/vms"
                                            onClick={event => handleView(row.idx)}
                                            activeClassName="cb_sidebar__link-active"
                                        >
                                            <TooltipMat title="설정">
                                                eslint-disable-next-line jsx-a11y/anchor-is-valid
                                                <i style={{
                                                    top: "0.70em",
                                                    left: "0.60em",
                                                }}><SettingsIcon style={{
                                                    fontSize: "1.3rem",
                                                }}/></i>
                                            </TooltipMat>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>*/}

                    <div className="vm__stats_border-none">
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">CPU</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">{row.cpu} cores</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-graph">
                                <Progress animated value={15}>15%</Progress>
                            </div>
                        </div>
                    </div>

                    <div className="vm__stats_border-none">
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">RAM</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">{row.ram} MB</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-graph">
                                <Progress animated value={35}>35%</Progress>
                            </div>
                        </div>
                    </div>

                    <div className="vm__stats_border-none last-border">
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">HDD</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">{row.hdd} GB</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-graph">
                                <Progress animated value={60}>60%</Progress>
                            </div>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat" style={{
                            height: "180px",
                        }}>
                            <div className="vm__stat-title">
                                Traffic
                            </div>
                            <BounceRateArea/>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <div className="vm__stat-title">VM IP</div>
                        </div>
                        <div className="vm__stat">
                            <div className="vm__stat-title">{row.ipAddr}</div>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <div className="vm__stat-title">내부접속 IP</div>
                        </div>
                        <div className="vm__stat">
                            <div className="vm__stat-title">{row.remoteAddr}</div>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <div className="vm__stat-title">외부접속 IP</div>
                        </div>
                        <div className="vm__stat">
                            <div className="vm__stat-title">-</div>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <div className="vm__stat-title">OS</div>
                        </div>
                        <div className="vm__stat">
                            <div className="vm__stat-title">
                                {row.os}&nbsp;
                                {dpOsImage(row.os)}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

const VmCard = () => {
    const [data, setData] = useState([]);
    const {
        selected,
        pageBeginRow,
        rowsPerPage,
        currentPage,
        totalCount,
        displayRowsList,
        dense,
        orderBy,
        order,
    } = useSelector(({pagingRd}) => ({
        selected: pagingRd.selected,
        pageBeginRow: pagingRd.pageBeginRow,
        rowsPerPage: pagingRd.rowsPerPage,
        currentPage: pagingRd.currentPage,
        totalPage: pagingRd.totalPage,
        totalCount: pagingRd.totalCount,
        displayRowsList: pagingRd.displayRowsList,
        dense: pagingRd.dense,
        orderBy: pagingRd.orderBy,
        order: pagingRd.order,
    }));

    const getPageData = async () => {
        let offset = 0;
        if (currentPage > 0) {
            offset = rowsPerPage * currentPage;
        }
        try {
            const response = await getMcVms({
                rows: rowsPerPage,
                offset,
                orderBy,
                order,
            });
            console.log("response: data ", response.data.data);
            setData(response.data.data);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    useEffect(() => {
        getPageData();
    }, []);

    return (
        <Fragment>
            {data && data.map((row, index) => {
                const keyId = index;
                return (
                    <VmCardContent key={keyId} row={row}/>
                );
            })}
        </Fragment>
        /*<Col md={12} lg={12} style={paddingCol}>
            {data && data.map((row, index) => {
                const keyId = index;
                return (
                    <Row><VmCardContent key={keyId} row={row}/></Row>
                );
            })}
        </Col>*/
    );
};

export default VmCard;
