import React, { PureComponent } from 'react';
import {
  Col, Container, Row, CardBody, Card,
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import { deleteCryptoTableData } from '../../../redux/actions/cryptoTableActions';
import { CryptoTableProps } from '../../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../../shared/prop-types/ReducerProps';
import CartCard from "../../ECommerce/Cart/components/CartCard";
import SubnetHeader from "../../Management/Subnet/CreateSubnet/components/SubnetHeader";
import CircleGraphCard from "./components/CircleGraphCard";
import ServerKtCloud from "../Manager/components/ServerKtCloud";
import TotalViews from "./components/TotalViews";
import CustomerBilling from "./components/CustomerBilling";

const dataServer = [
    { name: 'Server A', amt: 1500 },
    { name: 'Server B', amt: 2000 },
    { name: 'Server C', amt: 2290 },
    { name: 'Server D', amt: 2000 },
    { name: 'Server E', amt: 2181 },
    { name: 'Server F', amt: 1900 },
    { name: 'Server G', amt: 2100 },
    { name: 'Server H', amt: 2290 },
    { name: 'Server I', amt: 1200 },
    { name: 'Server J', amt: 2000 },
];
const dataNetwork = [
    { name: 'Network A', amt: 2400 },
    { name: 'Network B', amt: 2210 },
    { name: 'Network C', amt: 1200 },
    { name: 'Network D', amt: 2000 },
    { name: 'Network E', amt: 2180 },
    { name: 'Network F', amt: 2500 },
    { name: 'Network G', amt: 2100 },
    { name: 'Network H', amt: 2290 },
    { name: 'Network I', amt: 2000 },
    { name: 'Network J', amt: 2181 },
];
const dataAlarm = [
    { name: 'Alarm A', amt: 3 },
    { name: 'Alarm B', amt: 2 },
    { name: 'Alarm C', amt: 3 },
    { name: 'Alarm D', amt: 2 },
    { name: 'Alarm E', amt: 2 },
    { name: 'Alarm F', amt: 1 },
    { name: 'Alarm G', amt: 5 },
    { name: 'Alarm H', amt: 5 },
    { name: 'Alarm I', amt: 4 },
];
const dataPing = [
    { name: 'Ping A', amt: 2400 },
    { name: 'Ping B', amt: 2210 },
    { name: 'Ping C', amt: 2290 },
    { name: 'Ping D', amt: 2000 },
    { name: 'Ping E', amt: 2181 },
    { name: 'Ping F', amt: 2500 },
    { name: 'Ping G', amt: 2100 },
    { name: 'Ping H', amt: 2290 },
    { name: 'Ping I', amt: 2000 },
    { name: 'Ping J', amt: 2181 },
    { name: 'Ping J', amt: 2600 },
    { name: 'Ping J', amt: 2500 },
    { name: 'Ping J', amt: 2200 },
];

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

const billingData = [
    { value: 50, fill: '#4ce1b6' },
    { value: 50, fill: '#eeeeee' },
];

const DashboardCustomor = (
    t, cryptoTable, theme,
) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {direction} = useSelector(({rtl}) => ({
        direction: rtl.direction,
    }));

    const onDeleteCryptoTableData = (index, e) => {
        e.preventDefault();
        const arrayCopy = [...cryptoTable];
        arrayCopy.splice(index, 1);
        dispatch(deleteCryptoTableData(arrayCopy));
    };

    return (
        <Container fluid="true">
            <Row className={classes.row}>
                <Col md={12}>
                    <SubnetHeader head="DASHBOARD" />
                </Col>
            </Row>
            <Row>
                <Col md={6} lg={6} xs={12} sm={12} xl={3}>
                    <TotalViews cardTitle="SERVER" data={dataServer} color="#c88ffa" />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={3}>
                    <TotalViews cardTitle="NETWORK" data={dataNetwork} />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={3}>
                    <TotalViews cardTitle="ALARM" data={dataAlarm} color="#b71c1c" />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={3}>
                    <TotalViews cardTitle="PING" data={dataPing} color="#f6da6e"/>
                </Col>
            </Row>
            <Row className="classes.row">
                <Col md={6} lg={6} xs={12} sm={12} xl={6}>
                    <CustomerBilling t={t} data={billingData} />
                </Col>

                {/*<Col md={4} lg={4} xs={12} sm={6} xl={4}>*/}
                {/*    <CircleGraphCard dir={direction} />*/}
                {/*</Col>*/}
                {/*<Col md={4} lg={4} xs={12} sm={6} xl={4}>*/}
                {/*    <CircleGraphCard dir={direction} />*/}
                {/*</Col>*/}
                {/*<Col md={4} lg={4} xs={12} sm={6} xl={4}>*/}
                {/*    <CircleGraphCard dir={direction} />*/}
                {/*</Col>*/}
            </Row>
        </Container>
    );
};

DashboardCustomor.propTypes = {
  // t: PropTypes.func.isRequired,
  //cryptoTable: CryptoTableProps.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // rtl: RTLProps.isRequired,
  // theme: ThemeProps.isRequired,
};

export default connect(state => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(DashboardCustomor));
