import React, { PureComponent } from 'react';
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
        fontFamily: "Nanum Gothic Extra Bold",
        fontSize: 10,
        fontWeight: "revert",
        flexGrow: 1,
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        gridAutoFlow: "dense",
    },
    flex: {
        display: "flex",
    },
}));

const ManagerDashboard = ({
    t, cryptoTable, dispatch, rtl, theme,
}) => {
    const classes = useStyles();

    return (
        <>
            <Container className="dashboard">
                <Col md={12}>
                    <RouterBreadcrumbs url={window.location.href}/>
                </Col>
            </Container>
            <div className="dashboard">
                <Grid container className={classes.paper}>
                    <Grid item lg={4} md={6} sm={6}>
                        <ServerKtCloud />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6}>
                        <ServerOnPremise />
                    </Grid>
                    <Grid item lg={4} md={6} >
                        <NetworkOnPremise />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12}>
                        <PublicNetwork />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12}>
                        <RandomAnimatedBars />
                    </Grid>
                </Grid>
            </div>
        </>
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
