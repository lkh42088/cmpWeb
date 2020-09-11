import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Card, CardBody, Col, Container, Progress, Row, CardHeader,
} from 'reactstrap';
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
    ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {NavLink} from "react-router-dom";
import {Tooltip as TooltipMat} from "@material-ui/core";

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import * as common from "../../../../lib/common";

import getTooltipStyles from "../../../../shared/helpers";
import {getMcVms, getMcVmsGraph} from "../../../../lib/api/microCloud";
import {changeVmPage} from "../../../../redux/actions/vmsActions";
import {OPERATOR} from "../../../../lib/var/globalVariable";

const WindowsImg = `${process.env.PUBLIC_URL}/img/OS_Windows.ico`;
const LinuxImg = `${process.env.PUBLIC_URL}/img/OS_Linux.ico`;


const BounceRateArea = (props) => {
    const {
        title, height, mac, data, hostname,
    } = props;

    return (
        <ResponsiveContainer height={150}>
            <AreaChart
                data={data}
                margin={{
                    top: 0,
                    right: 0,
                    left: -15,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="time" tickLine={false}/>
                <YAxis tickLine={false}/>
                <CartesianGrid vertical={false}/>
                <Tooltip {...getTooltipStyles(data, 'defaultItems')} />
                <Area type="monotone" dataKey="rx" stroke="#5ca0d3" fill="#5ca0d3" fillOpacity={0.2}/>
                <Area type="monotone" dataKey="tx" stroke="red" fill="red" fillOpacity={0.2}/>
            </AreaChart>
        </ResponsiveContainer>
    );
};

const VmCardContent = (props) => {
    const {row} = props;
    const dispatch = useDispatch();
    const [graphData, setGraphData] = useState({
        cpu: '',
        mem: '',
        disk: '',
        traffic: [],
    });

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

    const funcPercent = (total, val) => {
        const x = val;
        const y = total;

        return (x / (y / 100)).toFixed(0);
    };

    const getGraphData = async (mac) => {
        try {
            const response = await getMcVmsGraph(mac);
            //setGraphData(response.data);
            /*console.log("💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌");
            console.log("💌💌 response.data : ", response.data);
            console.log("💌💌 response.data.Cpu : ", response.data.Cpu.percentIdleTime.toFixed(1));
            console.log("💌💌 response.data.Mem : ", response.data.Mem.availableBytes);
            console.log("💌💌 response.data.Disk : ", response.data.Disk.freeMegabytes);
            console.log("💌💌 response.data.Traffic : ", response.data.Traffic);
            console.log("💌💌 response.data.Traffic.Stats : ", response.data.Traffic.stats[0].data);*/

            const memFree = common.formatBytes(response.data.Mem.availableBytes, "GB");
            const diskFree = common.formatBytes(response.data.Disk.freeMegabytes * 1024 * 1024, "GB");
            //const traffic = response.data.Traffic.stats[0].data;
            //const diskFreeByte = diskFree * 1024 * 1024;
            /*console.log("MEMORY FREE 값 : ", memFree, "GB");
            console.log("MEMORY USE 값 : ", (1 - memFree), "GB");
            console.log("MEMORY ---> : ", funcPercent(1, (1 - memFree)));

            console.log("DISK diskFree : ", diskFree);
            console.log("DISK FREE 값 : ", diskFree, "GB");
            console.log("DISK USE 값 : ", (40 - diskFree), "GB");
            console.log("DISK ---> : ", funcPercent(40, (40 - diskFree)));*/
            //console.log("DISK diskFreeByte ---> : ", diskFreeByte);

            //console.log("---------------------------------");

            setGraphData({
                cpu: { /*이 값은 percent로 되어있음*/
                    percentIdleTime: response.data.Cpu.percentIdleTime.toFixed(1),
                    graphVal: (100 - response.data.Cpu.percentIdleTime).toFixed(1),
                },
                mem: {
                    availableBytes: response.data.Mem.availableBytes.toFixed(1),
                    graphVal: funcPercent(1, (1 - memFree)), /*total 1GB*/
                },
                disk: {
                    freeMegabytes: response.data.Disk.freeMegabytes.toFixed(1),
                    graphVal: funcPercent(40, (40 - diskFree)), /*total 40GB*/
                },
                traffic: (
                    response.data.Traffic.map(val => ({
                        time: new Date(val.time).toLocaleTimeString()
                            .split(" ")[1],
                        rx: val.bytesReceivedPersec.toFixed(2),
                        tx: val.bytesSentPersec.toFixed(2),
                    }))),
            });
        } catch (e) {
            console.log("getGraphData error!");
        }
    };

    useEffect(() => {
        getGraphData(row.mac);
        //setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
    }, [props]);

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

                    <div className="vm__stats_border-none">
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">
                                CPU
                                {/*{graphData.cpu.map((tempRow, index) => {
                                    const tempKey = index;
                                    return (
                                        <Fragment key={tempKey}>
                                            {tempRow}
                                        </Fragment>
                                    );
                                })}*/}
                            </div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-title">{row.cpu} cores</div>
                        </div>
                        <div className="vm__stat_border-none">
                            <div className="vm__stat-graph">
                                <div className="text-right">
                                    {graphData.cpu.graphVal}%
                                </div>
                                <Progress animated
                                          value={graphData.cpu.graphVal}/>
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
                                <div className="text-right">{graphData.mem.graphVal}%</div>
                                <Progress animated value={graphData.mem.graphVal}/>
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
                                <div className="text-right">{graphData.disk.graphVal}%</div>
                                <Progress animated value={graphData.disk.graphVal}/>
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
                            <BounceRateArea data={graphData.traffic}/>
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
                                {row.os}&nbsp;&nbsp;&nbsp;
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
    const user = JSON.parse(localStorage.getItem("user"));
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
            setData(response.data.data);
            console.log("getPageData try! : ", response.data.data);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    useEffect(() => {
        getPageData();
    }, []);

    useEffect(() => {
        const timer = setInterval(getPageData, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        /*<Fragment>
            {data && data.map((row, index) => {
                const keyId = index;

                if (keyId === 0) {
                    return (
                        <VmCardContent key={keyId} row={row}/>
                    );
                }
                return (
                    <div key={keyId}>
                        test
                    </div>
                );
            })}
        </Fragment>*/
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
