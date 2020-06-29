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
import InternetStatistics from "./components/InternetStatistics";
import CpuUsage from "./components/CpuUsage";

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
    { name: 'Server J', amt: 2000 }];

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
    { name: 'Network J', amt: 2181 }];

const dataAlarm = [
    { name: 'Alarm A', amt: 3 },
    { name: 'Alarm B', amt: 2 },
    { name: 'Alarm C', amt: 3 },
    { name: 'Alarm D', amt: 2 },
    { name: 'Alarm E', amt: 2 },
    { name: 'Alarm F', amt: 1 },
    { name: 'Alarm G', amt: 5 },
    { name: 'Alarm H', amt: 5 },
    { name: 'Alarm I', amt: 4 }];

const dataPing = [
    { name: 'Ping A', amt: 240 },
    { name: 'Ping B', amt: 200 },
    { name: 'Ping C', amt: 290 },
    { name: 'Ping D', amt: 200 },
    { name: 'Ping E', amt: 180 },
    { name: 'Ping F', amt: 250 },
    { name: 'Ping G', amt: 210 },
    { name: 'Ping H', amt: 229 },
    { name: 'Ping I', amt: 200 },
    { name: 'Ping J', amt: 218 },
    { name: 'Ping J', amt: 260 },
    { name: 'Ping J', amt: 250 },
    { name: 'Ping J', amt: 220 }];

const internetData = [
    { name: 'Mon', a: 590, b: 1400 },
    { name: 'Tue', a: 868, b: 1506 },
    { name: 'Wed', a: 1397, b: 989 },
    { name: 'Thu', a: 1480, b: 1228 },
    { name: 'Fri', a: 1520, b: 1100 },
    { name: 'Sat', a: 1520, b: 1100 },
    { name: 'Sun', a: 1400, b: 1700 }];

const billingData = [
    { value: 45, fill: '#4ce1b6' },
    { value: 55, fill: '#eeeeee' }];

const billingBarData = [
    {
        name: '지난달',
        server: 240000,
        kt: 20000,
        aws: 10000,
    }, {
        name: '이번달',
        server: 121000,
        kt: 20000,
        aws: 150000,
}];

const cpuData = [
    { name: '강남 KT-IDC', use: 70 },
    { name: 'HCN', use: 62 },
    { name: '구로 본사', use: 55 },
    { name: '서초 SK-IDC', use: 80 },
    { name: '세종 IDC', use: 90 },
    { name: '분당 KT-IDC', use: 70 },
    { name: 'KT CLOUD M1', use: 50 },
    { name: 'KT CLOUD M2', use: 55 }];

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
                <Col md={6} lg={6} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <TotalViews cardTitle="SERVER DATA" data={dataServer} color="#c88ffa" />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <TotalViews cardTitle="NETWORK DATA" data={dataNetwork} />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <TotalViews cardTitle="ALARM COUNT" data={dataAlarm} color="#b71c1c" />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <TotalViews cardTitle="PING FAIL" data={dataPing} color="#f6da6e"/>
                </Col>
            </Row>
            <Row className="classes.row">
                <Col md={12} lg={12} xs={12} sm={12} xl={12} style={{padding: 10}}>
                    <InternetStatistics data={internetData} dir={direction} />
                </Col>
            </Row>
            <Row className="classes.row">
                <Col md={12} lg={6} xs={12} sm={12} xl={6} style={{padding: 10}}>
                    <CustomerBilling t={t} numData={billingData} barData={billingBarData}/>
                </Col>
                <Col md={12} lg={6} xs={12} sm={12} xl={6} style={{padding: 10}}>
                    <CpuUsage data={cpuData} />
                </Col>
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
