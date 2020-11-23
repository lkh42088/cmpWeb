import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";
import MyResponsivePie from "./MyResponsivePie";
import GraphBar from "./GraphBar";
import GraphBarTemp from "./GraphBarTemp";
import {getRankingData, getTotalCount, getVmInfo} from "../../../../lib/api/microCloud";

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

const initialCount = [
    {
        id: "no data",
        label: "no data",
        value: 0,
        color: "hsl(226, 70%, 50%)",
    },
];

const initialState = {
    labels: [],
    datasets: [
        {
            label: 'NO DATA',
            // backgroundColor: '#a2d5f2',
            backgroundColor: "rgba(204, 0, 0, 0.2)",
            borderColor: '#ff5722',
            opacity: '0.5',
            borderWidth: 1,
            hoverBackgroundColor: '#07689f',
            hoverBorderColor: '#07689f',
            categoryPercentage: 0.6,
            barPercentage: 0.8,
            minBarLength: 2,
            data: [],
        },
    ],
};

const TopManagerMain = () => {
    const classes = useStyles();
    // For Rank
    const [cpu, setCpu] = useState(initialState);
    const [mem, setMem] = useState(initialState);
    const [disk, setDisk] = useState(initialState);
    const [traffic, setTraffic] = useState(initialState);
    // For Count
    const [serverCnt, setServerCnt] = useState();
    const [vmCnt, setVmCnt] = useState();
    const [platform, setPlatform] = useState(initialCount);
    const [os, setOs] = useState(initialCount);

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getCount = async () => {
        try {
            const response = await getTotalCount();
            // console.log("TEST RESPONSE: ", response.data);

            setServerCnt(response.data.count[0]);
            setVmCnt(response.data.count[1]);
            setPlatform(
                response.data.platform.map(val => ({
                    id: val.modelName,
                    value: val.count,
                })),
            );
            setOs(
                response.data.osInfo.map(val => ({
                    id: val.os,
                    value: val.count,
                })),
            );
        } catch {
            console.log("No data!");
        }
    };

    const getData = async () => {
        try {
            const response = await getRankingData();
            //console.log("response : ", response.data);

            const tmpLabels = response.data.cpu.map(val => (val.serial_number));
            const tmpData = response.data.cpu.map(val => (val.avg.toFixed(1)));
            initialState.datasets.data = tmpData;

            setCpu({
                labels: response.data.cpu.map(val => (val.serial_number)),
                datasets: [{
                    ...initialState.datasets[0],
                    label: "CPU (%)",
                    data: response.data.cpu.map(val => val.avg.toFixed(1)),
                }],
            });

            setMem({
                labels: response.data.mem.map(val => (val.serial_number)),
                datasets: [{
                    ...initialState.datasets[0],
                    label: "MEM (%)",
                    data: response.data.mem.map(val => val.avg.toFixed(1)),
                }],
            });

            setDisk({
                labels: response.data.disk.map(val => (val.serial_number)),
                datasets: [{
                    ...initialState.datasets[0],
                    label: "DISK (%)",
                    data: response.data.disk.map(val => val.avg.toFixed(1)),
                }],
            });

            setTraffic({
                labels: response.data.traffic.map(val => (val.serial_number)),
                datasets: [{
                    ...initialState.datasets[0],
                    label: "TRAFFIC (MB)",
                    data: response.data.traffic.map(val => (val.avg / 1024 / 1024).toFixed(0)),
                }],
            });
        } catch {
            console.log("No data!");
        }
    };

    const repeatFunc = () => {
        getCount();
        getData();
    };

    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        repeatFunc();
        const timer = setInterval(repeatFunc, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Fragment>
            <Row className="classes.row">
                <Col md={6} lg={6} xs={12} sm={12} xl={6} style={{padding: 10}}>
                    <MyResponsivePie
                        height={300}
                        title="SERVER" pieColor={pieColor}
                        warringUsed={80}
                        count={serverCnt}
                        data={platform}
                    />
                </Col>
                <Col md={6} lg={6} xs={12} sm={12} xl={6} style={{padding: 10}}>
                    <MyResponsivePie
                        height={300}
                        title="VM" pieColor={pieColor}
                        warringUsed={80}
                        count={vmCnt}
                        data={os}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={220} data={cpu}/>
                    {/*<GraphBarTemp height={220} data={cpu}/>*/}
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={220} data={mem}/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={220} data={disk}/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={220} data={traffic}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TopManagerMain;
