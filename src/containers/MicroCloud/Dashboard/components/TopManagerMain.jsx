import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Container, Row,
} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";
import MyResponsivePie from "./MyResponsivePie";
import GraphBar from "./GraphBar";
import {getRankingData, getVmInfo} from "../../../../lib/api/microCloud";

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

const initialState = {
    labels: [],
    datasets:
        {
            label: '',
            backgroundColor: '#a2d5f2',
            borderColor: '#a2d5f2',
            borderWidth: 1,
            hoverBackgroundColor: '#07689f',
            hoverBorderColor: '#07689f',
        },
};

const TopManagerMain = () => {
    const classes = useStyles();
    const [cpu, setCpu] = useState(initialState);
    const [mem, setMem] = useState([]);
    const [disk, setDisk] = useState([]);
    const [traffic, setTraffic] = useState([]);
    const [cpuTitle, setCpuTitle] = useState("CPU (%)");
    const [memTitle, setMemTitle] = useState("MEM (Mbytes)");
    const [diskTitle, setDiskTitle] = useState("DISK (Gbytes)");
    const [trafficTitle, setTrafficTitle] = useState("RX (Kbytes)");

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        try {
            const response = await getRankingData();
            //console.log("TEST RESPONSE: ", response.data.cpu[0].avg);
            const tmpLabels = response.data.cpu.map(val => (val.serial_number));
            const tmpData = response.data.cpu.map(val => (val.avg.toFixed(1)));
            initialState.datasets.data = tmpData;
            setCpu({
                    labels: response.data.cpu.map(val => (val.serial_number)),
                    datasets: {
                        ...cpu.datasets,
                        data: response.data.cpu.map(val => (val.avg.toFixed(1))),
                    },
            });

            // setMem(
            //     response.data.mem.data.map(val => ({
            //         y: (val.y / 1024 / 1024).toFixed(1),
            //     })),
            // );
            // setDisk(
            //     response.data.disk.data.map(val => ({
            //         y: (vm.hdd - (val.y / 1024)).toFixed(1),
            //     })),
            // );
            // setTraffic(
            //     response.data.rx.data.map(val => ({
            //         y: ((val.y * INTERVAL) / 1024).toFixed(1),
            //     })),
            // );
        } catch {
            console.log("No data!");
        }
    };

    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * useEffect
     **************************************************************/


    // useEffect(() => {
    //     if (cpu.length > 0) {
    //         setCpuTitle(`CPU (${cpu[cpu.length - 1].y} %)`);
    //     }
    //     if (mem.length > 0) {
    //         setMemTitle(`MEM (${mem[mem.length - 1].y} Mbytes)`);
    //     }
    //     if (disk.length > 0) {
    //         setDiskTitle(`DISK (${disk[disk.length - 1].y} Gbytes)`);
    //     }
    //     if (traffic.length > 0) {
    //         setTrafficTitle(`RX (${traffic[traffic.length - 1].y} Kbytes)`);
    //     }
    // }, [cpu, mem, disk, traffic]);

    useEffect(() => {
        getRankingData();
        const timer = setInterval(getData, 10000);
        return () => clearInterval(timer);
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
                    <GraphBar height={190} data={cpu}/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={190}/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={190}/>
                </Col>
                <Col md={3} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <GraphBar height={190}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TopManagerMain;
