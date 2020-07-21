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
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Noto Sans KR R",
        fontSize: 10,
        fontWeight: "revert",
        flexGrow: 1,
    },
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridAutoFlow: "dense",
        gridTemplateRows: "auto 1fr",
        gridGap: 20,
    },
    gridOneRow: {
        gridColumnEnd: "span 2",
    },
    gridTwoRows: {
        gridColumnEnd: "span 3",
    },
}));

const ManagerDashboard = ({
    t, cryptoTable, dispatch, rtl, theme,
}) => {
    const classes = useStyles();
    const onClick1 = () => {
        document.getElementById("div1").style.display = "none";
    };
    const onClick2 = () => {
        document.getElementById("div2").style.display = "none";
    };
    const onClick3 = () => {
        document.getElementById("div3").style.display = "none";
    };
    const onClick4 = () => {
        document.getElementById("div4").style.display = "none";
    };
    const onClick5 = () => {
        document.getElementById("div5").style.display = "none";
    };

    return (
        <Container>
            <Col md={12}>
                <RouterBreadcrumbs url={window.location.href}/>
            </Col>
            <div className="dashboard">
                <div className={classes.container}>
                    <div className={classes.gridOneRow} id="div1">
                        <ServerKtCloud close={onClick1}/>
                    </div>
                    <div className={classes.gridOneRow} id="div2">
                        <ServerOnPremise close={onClick2}/>
                    </div>
                    <div className={classes.gridOneRow} id="div3">
                        <NetworkOnPremise close={onClick3}/>
                    </div>
                    <div className={classes.gridTwoRows} id="div4">
                        <PublicNetwork close={onClick4}/>
                    </div>
                    <div className={classes.gridTwoRows} id="div5">
                        <RandomAnimatedBars close={onClick5}/>
                    </div>
                </div>
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
