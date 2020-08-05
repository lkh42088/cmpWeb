import React, { useState } from 'react';
import {
  Col, Container, Row, CardBody, Card,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import ServerKtCloud from './components/ServerKtCloud';
import ServerOnPremise from './components/ServerOnPremise';
import NetworkOnPremise from './components/NetworkOnPremise';
import PublicNetwork from './components/PublicNetwork';
import RandomAnimatedBars from './components/RandomAnimatedBars';
import { CryptoTableProps } from '../../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../../shared/prop-types/ReducerProps';
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Source Han Serif KR R",
        fontSize: 10,
        fontWeight: "revert",
        flexGrow: 1,
        height: 480,
    },
    gridItem: {
        height: "100%",
    },
}));

const ManagerDashboard = ({
    t, cryptoTable, dispatch, rtl, theme,
}) => {
    const classes = useStyles();
    const onClick1 = () => {
        document.getElementById("grid1").style.display = "none";
    };
    const onClick2 = () => {
        document.getElementById("grid2").style.display = "none";
    };
    const onClick3 = () => {
        document.getElementById("grid3").style.display = "none";
    };
    const onClick4 = () => {
        document.getElementById("grid4").style.display = "none";
    };
    const onClick5 = () => {
        document.getElementById("grid5").style.display = "none";
    };

    return (
        <Container>
            <Col md={12}>
                <RouterBreadcrumbs url={window.location.href}/>
            </Col>
            <div className="dashboard">
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={4} id="grid1">
                        <ServerKtCloud close={onClick1}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} id="grid2">
                        <ServerOnPremise close={onClick2}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} id="grid3">
                        <NetworkOnPremise close={onClick3}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} id="grid4">
                        <PublicNetwork close={onClick4}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} id="grid5">
                        <RandomAnimatedBars close={onClick5}/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

ManagerDashboard.propTypes = {
    t: PropTypes.func.isRequired,
    cryptoTable: CryptoTableProps.isRequired,
    dispatch: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
    theme: ThemeProps.isRequired,
};

export default connect(state => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(ManagerDashboard));
