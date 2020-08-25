import React from 'react';
import {
  Col, Container, Row,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import {connect, useDispatch, useSelector} from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import MyResponsivePie from "./components/MyResponsivePie";
import MyResponsiveBump from "./components/MyResponsiveBump";
import MyResponsiveLine from "./components/MyResponsiveLine";

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


const MicroCloudDashboard = ({t}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {direction} = useSelector(({rtl}) => ({
        direction: rtl.direction,
    }));

    const mac = "fe:54:00:d9:f7:6c";

    return (
        <Container fluid>
            <Row className={classes.row}>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row className="classes.row">
                <Col md={6} lg={4} xs={12} sm={12} xl={4} style={{padding: 10}}>
                    <MyResponsivePie height={300} title="CPU" color="nivo" />
                </Col>
                <Col md={6} lg={4} xs={12} sm={12} xl={4} style={{padding: 10}}>
                    <MyResponsivePie height={300} title="MEM" color="greys" />
                </Col>
                <Col md={6} lg={4} xs={12} sm={12} xl={4} style={{padding: 10}}>
                    <MyResponsivePie height={300} title="DISK" color="yellow_green_blue" />
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

MicroCloudDashboard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default connect(state => ({
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(MicroCloudDashboard));
