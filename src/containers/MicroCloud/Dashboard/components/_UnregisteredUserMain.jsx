import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";

import RouterBreadcrumbs from "../../../Layout/page/Breadcrumb";
import MyResponsiveLine from "./MyResponsiveLine";
import MyResponsiveCpu from "./MyResponsiveCpu";
import MyResponsiveMem from "./MyResponsiveMem";
import MyResponsiveDisk from "./MyResponsiveDisk";
import NBSmallAreaChart from "./NBSmallAreaChart";
import MyResponsiveInfo from "./MyResponsiveInfo";

import {
    getVmInterfaceTraffic, getServeries, unregisterMcServer, getMcServers,
} from "../../../../lib/api/microCloud";
import {getCompanies} from "../../../../lib/api/company";
import {
    NB_MANAGER, TOP_MANAGER, UNREGISTERED_USER,
} from "../../../../lib/var/globalVariable";

import TopManagerMain from "./TopManagerMain";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(2),
        color: 'red',
        marginBottom: theme.spacing(10),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(10),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    row: {
        paddingBottom: 15,
    },
}));

const pieColor = {
    defaultColor: '#d4d7dd',
    textColor: '#414141',
    warringColor: '#ec0101',
    cpuColor: {
        use: '#3f51b5',
        free: '#63686e',
    },
    memColor: {
        use: '#2fc4b2',
        free: '#63686e',
    },
    diskColor: {
        use: '#ff8364',
        free: '#63686e',
    },
};

const _UnregisteredUserMain = () => {
    const classes = useStyles();

    //const mac = "52:54:00:01:b5:b7"; //todo: need to fix
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState({
        stats: [{
            id: "RX",
            data: [],
        }, {
            id: "TX",
            data: [],
        },
        ],
    });
    const [rx, setRx] = useState([]);
    const [tx, setTx] = useState([]);
    const [hostname, setHostname] = useState("");

    /*******************
     * Etc.
     *******************/
    const [companyList, setCompanyList] = useState([]);
    const [serverList, setServerList] = useState([]);
    const [mac, setMac] = useState("52:54:00:01:b5:b7");
    const [dashDp, setDashDp] = useState("all");
    const [schCompany, setSchCompany] = useState("all");

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        if (!mac) {
            return;
        }

        try {
            const response = await getVmInterfaceTraffic({mac});
            //console.log("TEST RESPONSE1: ", response.data.stats[0].data);
            setData({
                stats: (
                    response.data.stats.map(val => ({
                        id: val.id,
                        data: val.data.map(s => ({
                            // ...s,
                            x: new Date(s.x),
                            y: s.y,
                        })),
                    }))),
            });
            setRx(
                response.data.stats[0].data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString()
                        .split(" ")[1],
                    y: val.y,
                })),
            );
            setTx(
                response.data.stats[1].data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString()
                        .split(" ")[1],
                    y: val.y,
                })),
            );
            setHostname(response.data.hostname);
        } catch {
            setData({
                ...data,
                data: [],
            });
        }
    };

    const getCompanyList = async () => {
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
            console.log("response.data : ", response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    /**************************************************************
     * Handle Function
     **************************************************************/

    const handleChangeCompany = (e) => {
        //getServerList(e.target.value);
        setSchCompany(e.target.value);
    };

    const handleAuthDisplay = (val) => {
        let component;
        const schComponent = (
            <Fragment>
                <Row className="classes.row">
                    <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                        <MyResponsiveCpu
                            height={150}
                            mac={mac}
                            title="CPU" pieColor={pieColor} warringUsed={80}/>
                    </Col>
                    <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                        <MyResponsiveMem
                            height={150}
                            mac={mac}
                            title="MEMORY" pieColor={pieColor} warringUsed={80}/>
                    </Col>
                    <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                        <MyResponsiveDisk
                            height={150}
                            mac={mac}
                            title="DISK" pieColor={pieColor} warringUsed={80}/>
                    </Col>
                    <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                        <MyResponsiveInfo
                            height={150}
                            title="HOSTNAME"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3} sm={12} style={{padding: 10}}>
                        <NBSmallAreaChart data={rx} hostname="RX"/>
                    </Col>
                    <Col md={3} sm={12} style={{padding: 10}}>
                        <NBSmallAreaChart data={tx} hostname="TX"/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} style={{padding: 10}}>
                        <MyResponsiveLine height={400}
                                          title="BareMetal Out Interface"
                                          data={data}
                                          hostname={hostname}
                        />
                    </Col>
                </Row>
            </Fragment>
        );

        setDashDp(schComponent);
    };

    /**************************************************************
     * useEffect
     **************************************************************/

    useEffect(() => {
        handleAuthDisplay(user);
    }, []);

    useEffect(() => {
        getData();
        getCompanyList();
        //getServerList('all');
        const timer = setInterval(getData, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Row className={classes.row}>
            UnregisteredUserMain
        </Row>
    );
};

export default _UnregisteredUserMain;
