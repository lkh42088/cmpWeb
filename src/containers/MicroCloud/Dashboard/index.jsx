import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";

import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

import {
    getVmInterfaceTraffic, getServeries, unregisterMcServer, getMcServers,
} from "../../../lib/api/microCloud";
import {getCompanies} from "../../../lib/api/company";
import {
    NB_MANAGER, TOP_MANAGER, UNREGISTERED_USER,
} from "../../../lib/var/globalVariable";

import TopManagerMain from "./components/TopManagerMain";
import BaremetalMain from "./components/BaremetalMain";

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

const MicroCloudDashboard = () => {
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
    const [mac, setMac] = useState(""); //52:54:00:01:b5:b7
    const [dashDp, setDashDp] = useState("all");
    const [schCompany, setSchCompany] = useState("all");

    /**************************************************************
     * Axios Function
     **************************************************************/
    /*const getData = async () => {
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
    };*/

    const getCompanyList = async () => {
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
            //console.log("response.data : ", response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    const getServerMac = async (val) => {
        try {
            //"/v1/micro/servers-paging/10/0//desc/신용회복위원회"
            const response = await getMcServers({
                rows: 0,
                offset: 0,
                orderBy: '',
                order: 'desc',
                cpName: val,
            });

            if (response.data.data[0] === undefined) {
                setServerList([]);
                setMac("nodata");
            } else {
                setServerList(response.data.data);
                setMac(response.data.data[0].mac);
            }
        } catch (error) {
            setServerList([]);
        }
    };

    /**************************************************************
     * Handle Function
     **************************************************************/

    const handleChangeCompany = (e) => {
        setSchCompany(e.target.value);
        getServerMac(e.target.value);
    };

    const handleAuthSelectDisplay = (val, flag) => {
        let topSelect;
        if (val) {
            const {level} = user;
            switch (level) {
                case TOP_MANAGER:
                    topSelect = (
                        <Row>
                            <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                            <select name="company" onChange={handleChangeCompany}>
                                <option key="all" value="all">:: ALL DATA ::</option>
                                {companyList && companyList.map((item, index) => {
                                    const key = index;
                                    return (
                                        <option key={key} value={item.name}>{item.name}</option>
                                    );
                                })}
                            </select>
                            </Col>
                        </Row>
                    );
                    break;
                case NB_MANAGER:
                    topSelect = (
                        <Row>
                            <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                            <select name="company" onChange={handleChangeCompany}>
                                <option key="all" value="all">:: ALL DATA ::</option>
                                {companyList && companyList.map((item, index) => {
                                    const key = index;
                                    return (
                                        <option key={key} value={item.name}>{item.name}</option>
                                    );
                                })}
                            </select>
                            </Col>
                        </Row>
                    );
                    break;
                case UNREGISTERED_USER:
                    topSelect = "";
                    break;
                default:
                    break;
            }
        }
        return topSelect;
    };

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        //getData();
        getCompanyList();
        /*const timer = setInterval(getData, 5000);
        return () => clearInterval(timer);*/
    }, []);

    return (
        <Container fluid style={{
            overflowY: "hidden",
        }}>
            <Row className={classes.row}>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            {handleAuthSelectDisplay(user)}
            {/* eslint-disable-next-line no-nested-ternary */}
            {schCompany === "all" ? (
                <TopManagerMain/>
            ) : mac ? (<BaremetalMain mac={mac}/>) : false}
        </Container>
    );
};

export default MicroCloudDashboard;
