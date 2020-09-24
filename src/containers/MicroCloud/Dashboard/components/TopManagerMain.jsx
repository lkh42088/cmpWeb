import React, {useEffect, useState, Fragment} from 'react';
import {
    Card, CardBody,
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";

import {
    NB_MANAGER, TOP_MANAGER, UNREGISTERED_USER,
} from "../../../../lib/var/globalVariable";

import MyResponsivePie from "./MyResponsivePie";
import MyResponsiveCpu from "./MyResponsiveCpu";
import GraphBar from "./GraphBar";

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

const data = [
    {
        id: "lisp",
        label: "lisp",
        value: 316,
        color: "hsl(226, 70%, 50%)",
    },
    {
        id: "python",
        label: "python",
        value: 588,
        color: "hsl(196, 70%, 50%)",
    },
    {
        id: "make",
        label: "make",
        value: 37,
        color: "hsl(204, 70%, 50%)",
    },
    {
        id: "php",
        label: "php",
        value: 428,
        color: "hsl(277, 70%, 50%)",
    },
    {
        id: "rust",
        label: "rust",
        value: 229,
        color: "hsl(31, 70%, 50%)",
    },
];

const TopManagerMain = () => {
    const classes = useStyles();

    //const mac = "52:54:00:01:b5:b7"; //todo: need to fix
    const user = JSON.parse(localStorage.getItem("user"));

    /*******************
     * Etc.
     *******************/

    /**************************************************************
     * Axios Function
     **************************************************************/

    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * useEffect
     **************************************************************/

    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <Row className="classes.row">
                <Col md={6} lg={6} xs={12} sm={12} xl={6} style={{padding: 10}}>
                    <MyResponsivePie
                        height={300}
                        title="PIE" pieColor={pieColor}
                        warringUsed={80}
                        data={data}
                    />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={6} style={{padding: 10}}>
                    <MyResponsivePie
                        height={300}
                        title="PIE" pieColor={pieColor}
                        warringUsed={80}
                        data={data}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TopManagerMain;
