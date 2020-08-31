import React from 'react';
import {
  Col, Container, Row,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import {connect, useDispatch, useSelector} from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import MyResponsivePie from "./components/MyResponsivePie";
import MyResponsiveLine from "./components/MyResponsiveLine";
import MyResponsiveCpu from "./components/MyResponsiveCpu";
import MyResponsiveMem from "./components/MyResponsiveMem";
import MyResponsiveDisk from "./components/MyResponsiveDisk";

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

    const mac = "52:54:00:01:b5:b7"; //todo: need to fix

    return (
        <Container fluid>
            <Row className={classes.row}>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row className="classes.row">
                <Col md={6} lg={4} xs={12} sm={12} xl={4} style={{padding: 10}}>
                    <MyResponsiveCpu height={300} title="CPU" color="nivo" />
                </Col>
                <Col md={6} lg={4} xs={12} sm={12} xl={4} style={{padding: 10}}>
                    <MyResponsiveMem height={300} title="MEM" color="greys" />
                </Col>
                <Col md={6} lg={4} xs={12} sm={12} xl={4} style={{padding: 10}}>
                    <MyResponsiveDisk height={300} title="DISK" color="yellow_green_blue" />
                </Col>
            </Row>
            <Row>
                <Col md={12} style={{padding: 10}}>
                    <MyResponsiveLine height={400} title="VM Interface RX/TX" mac={mac} />
                </Col>
            </Row>
        </Container>
    );
};

export default MicroCloudDashboard;
