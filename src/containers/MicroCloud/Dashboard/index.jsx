import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

import {
    getVmInterfaceTraffic, getServeries, unregisterMcServer, getMcServers,
} from "../../../lib/api/microCloud";
import {getCompanies} from "../../../lib/api/company";
import {
    NB_MANAGER, TOP_MANAGER, UNREGISTERED_USER, CUSTOMER_MANAGER,
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const MicroCloudDashboard = () => {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;

    /*******************
     * Etc.
     *******************/
    const [companyList, setCompanyList] = useState([]);
    const [serverList, setServerList] = useState([]);
    const [mac, setMac] = useState(""); //52:54:00:01:b5:b7
    const [schCompany, setSchCompany] = useState("");
    const [schCompanyIdx, setSchCompanyIdx] = useState("");
    const [selectCompany, setSelectCompany] = useState();

    /**************************************************************
     * Axios Function
     **************************************************************/

    const getServerMac = async (val) => {
        try {
            const response = await getMcServers({
                rows: 0,
                offset: 0,
                orderBy: '',
                order: 'desc',
                cpName: val,
            });

            console.log("getServerMac response data : ", response.data.data);

            if (response.data.data[0] === undefined) {
                setServerList([]);
                setMac("nodata");
                //setSchCompany(user.cpName);
            } else {
                console.log("MAC!! : ", response.data.data[0].mac);
                setServerList(response.data.data);
                setMac(response.data.data[0].mac);
                setSchCompany(val);
                setSchCompanyIdx(response.data.data[0].cpIdx);
            }
        } catch (error) {
            setServerList([]);
            console.log("getServerMac error ");
        }
    };

    const getCompanyList = async () => {
        try {
            const response = await getCompanies();
            setCompanyList(response.data);
        } catch (error) {
            setCompanyList([]);
        }
    };

    /**************************************************************
     * Handle Function
     **************************************************************/

    const handleChangeCompany = (e) => {
        setSchCompany(e.target.value);
        getServerMac(e.target.value);

        const reDataCompany = companyList.filter(item => item.name === e.target.value);
        setSchCompanyIdx(reDataCompany[0].idx);
    };

    const handleAuthSelectDisplay = () => {
        if (level >= CUSTOMER_MANAGER) {
            getServerMac(user.cpName);
        } else {
            setSchCompany("all");
        }
    };

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        getCompanyList();
    }, []);

    useEffect(() => {
        handleAuthSelectDisplay();
    }, [companyList]);

    return (
        <Container fluid style={{
            overflowY: "hidden",
            board: "1px solid red",
        }}>
            {/*<Row className={classes.row}>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>*/}
            {/*★schCompany : {schCompany}
            <br/>
            ★mac  :{mac}*/}

            {level < CUSTOMER_MANAGER ? (
                <Row style={{
                    marginTop: "-8px",
                }}>
                    <Col md={6} lg={3} xs={12} sm={12} xl={3}>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-autowidth-label"
                                            style={{
                                                fontSize: "1rem",
                                            }}>customer</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    name="company"
                                    autoWidth
                                    value={schCompany}
                                    onChange={handleChangeCompany}
                                    style={{
                                        fontSize: "0.7rem",
                                        width: "100%",
                                    }}
                                >
                                    <MenuItem key="all" value="all">
                                        <em>:: ALL DATA ::</em>
                                    </MenuItem>
                                    {companyList && companyList.map((item, index) => {
                                        const key = index;
                                        return (
                                            <MenuItem key={key} value={item.name}>
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {/*<FormHelperText>Auto width</FormHelperText>*/}
                            </FormControl>
                        </div>
                    </Col>
                </Row>
            ) : false}

            {/* eslint-disable-next-line no-nested-ternary */}
            {/*{schCompany === "all" ? (
                <TopManagerMain/>
            ) : mac ? (<BaremetalMain mac={mac} company={schCompany} cpIdx={schCompanyIdx}/>) : <div>mac({mac}) 정보 오류</div>}*/}
            {schCompany === "all" ? (
                <TopManagerMain/>
            ) : (
                <BaremetalMain mac={mac} company={schCompany} cpIdx={schCompanyIdx}/>
            )}
        </Container>
    );
};

export default MicroCloudDashboard;
