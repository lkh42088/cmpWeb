import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";

import {
    NB_MANAGER, TOP_MANAGER, UNREGISTERED_USER,
} from "../../../../lib/var/globalVariable";

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
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    All Manager
                </Col>
            </Row>
        </Fragment>
    );
};

export default TopManagerMain;
