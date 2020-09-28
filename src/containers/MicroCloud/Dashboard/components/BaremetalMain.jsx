import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Row,
} from 'reactstrap';

import MyResponsiveLine from "./MyResponsiveLine";
import MyResponsiveCpu from "./MyResponsiveCpu";
import MyResponsiveMem from "./MyResponsiveMem";
import MyResponsiveDisk from "./MyResponsiveDisk";
import MyResponsiveInfo from "./MyResponsiveInfo";
import CountInfo from "./CountInfo";
import {OPERATOR} from "../../../../lib/var/globalVariable";
import {
    getMcServers, getMcVms, getMcVmsCountByCpName,
} from "../../../../lib/api/microCloud";

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

const BaremetalMain = (props) => {
    const {
        mac, company,
    } = props;
    const user = JSON.parse(localStorage.getItem("user"));

    const [vmCount, setVmCount] = useState(0);
    const [snapshotCount, setSnapshotCount] = useState(0);
    const [backupCount, setBackupCount] = useState(0);


    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * Axios Function
     **************************************************************/
    const getData = async () => {
        let companyName;
        if (user.level <= OPERATOR) { //관리자
            companyName = company;
        } else {
            companyName = user.cpName;
        }
        try {
            console.log("companyName : ", companyName);
            const vm = await getMcVmsCountByCpName(companyName);
            console.log("BAREMETAL response: ", vm.data);
            setVmCount(vm.data.vm);
        } catch (e) {
            console.log("getPageData error!");
        }
    };


    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        getData();
        const timer = setInterval(getData, 10000);
        return () => clearInterval(timer);
    }, [mac]);

    return (
        <Fragment>
            <Row className="classes.row">
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveInfo
                        height={150}
                        mac={mac}
                        title="HOSTNAME"
                    />
                </Col>
                {/*todo Pie graph도 하나의 component로 변경 필요*/}
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveCpu
                        height={150}
                        mac={mac}
                        title="CPU" pieColor={pieColor} warringUsed={80}/>
                </Col>
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveMem
                        height={150}
                        mac={mac}
                        title="MEMORY" pieColor={pieColor} warringUsed={80}/>
                </Col>
                <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                    <MyResponsiveDisk
                        height={150}
                        mac={mac}
                        title="DISK" pieColor={pieColor} warringUsed={80}/>
                </Col>
            </Row>
            <Row>
                <Col md={2} style={{padding: 10}}>
                    <Row style={{padding: "0 15px"}}>
                        <CountInfo title="VM 개수" count={vmCount}
                                   color="#00bcd4"/>
                    </Row>
                    <Row style={{padding: "0 15px"}}>
                        <CountInfo title="Snapshot 개수" count={snapshotCount}
                                   color="#ffa931"/>
                    </Row>
                    <Row style={{padding: "0 15px"}}>
                        <CountInfo title="Backup 개수" count={backupCount}
                                   color="#0f4c75"/>
                    </Row>
                </Col>
                <Col md={10} style={{padding: "10px 10px 0", marginBottom: "10px"}}>
                    <MyResponsiveLine height={350}
                                      title="BareMetal Out Interface"
                                      mac={mac}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default BaremetalMain;
