import React, {useEffect, useState, Fragment} from 'react';
import {
    Col, Row,
} from 'reactstrap';
// getMcVms
import MyResponsiveLine from "./MyResponsiveLine";
import MyResponsiveCpu from "./MyResponsiveCpu";
import MyResponsiveMem from "./MyResponsiveMem";
import MyResponsiveDisk from "./MyResponsiveDisk";
import MyResponsiveInfo from "./MyResponsiveInfo";
import CountInfo from "./CountInfo";
import {OPERATOR} from "../../../../lib/var/globalVariable";
import {
    getMcVmsCountByCpName, getMcSnapshotCountByCpIdx,
} from "../../../../lib/api/microCloud";

import {getMcNetworksMem} from "../../../../lib/api/microCloudMem";
import {getMcNetworksCpu} from "../../../../lib/api/microCloudCpu";
import {getMcNetworksDisk} from "../../../../lib/api/microCloudDisk";
import NBSimpleCarousel from "./NBSimpleCarousel";
import GraphSpeedometer from "./GraphSpeedometer";

const CountInfoStyle = {
    /*vm: "#ee6f57",
    snapshot: "#ffa931",
    backup: "#0f4c75",*/
    color: {
        /*vm: "#a2d5f2",
        snapshot: "#3f72af",
        backup: "#112d4e",*/
        vm: "#ffb400",
        snapshot: "#2994b2",
        backup: "#474744",
        /*vm: "#14274e",
        snapshot: "#394867",
        backup: "#9ba4b4",*/
        /*vm: "#9ba4b4",
        snapshot: "#2d6187",
        backup: "#056674",*/
    },
    size: {
        padding: "0 15px",
        marginBottom: "1%",
        height: "33%",
    },
};

const BaremetalMain = (props) => {
    const {
        mac, company, cpIdx,
    } = props;
    const user = JSON.parse(localStorage.getItem("user"));

    const [vmCount, setVmCount] = useState(0);
    const [snapshotCount, setSnapshotCount] = useState(0);
    const [backupCount, setBackupCount] = useState(0);
    // Resource data
    const [cpu, setCpu] = useState(0);
    const [mem, setMem] = useState(0);
    const [disk, setDisk] = useState(0);
    const [err, setErr] = useState();
    const [cpName, setCpName] = useState(company);

    /**************************************************************
     * Handle Function
     **************************************************************/

    /**************************************************************
     * Axios Function
     **************************************************************/
    let companyName;
    let companyIdx;
    const getData = async () => {
        if (user.level <= OPERATOR) { //관리자
            companyName = company;
            companyIdx = cpIdx;

            if (company === "") { // first 예외 처리
                companyName = user.cpName;
                companyIdx = user.cpIdx;
            }
        } else {
            companyName = user.cpName;
            companyIdx = user.cpIdx;
        }

        try {
            setCpName(companyName);
            const vm = await getMcVmsCountByCpName(companyName);
            const snapshot = await getMcSnapshotCountByCpIdx(companyIdx);
            setVmCount(vm.data.vm);
            setSnapshotCount(snapshot.data.snapshot);
        } catch (e) {
            console.log("getPageData error!");
        }
    };

    const getResourceData = async () => {
        try {
            if (mac !== "") {
                // cpu
                const cpuVal = await getMcNetworksCpu(mac);
                const value = (100 - cpuVal.data[0].usage_idle).toFixed(0);
                setCpu(Number(value));
                // mem
                const memVal = await getMcNetworksMem(mac);
                setMem(Number(100 - memVal.data[0].available_percent.toFixed(0)));
                // disk
                const diskVal = await getMcNetworksDisk(mac);
                if (diskVal.data[0].err === "nodata" || memVal.data[0].err === "nodata" || cpuVal.data[0].err === "nodata") {
                    setErr("nodata");
                } else {
                    setErr("");
                }
                setDisk(Number(diskVal.data[0].used_percent.toFixed(0)));
            }
        } catch (e) {
            console.log("getResourceData error!");
        }
    };

    const getCpuData = async () => {
        //setCpu(0);
        try {
            const cpuVal = await getMcNetworksCpu(mac);
            if (cpuVal.data[0].err === "nodata") {
                setErr("nodata");
            } else {
                setErr("");
            }
            const value = (100 - cpuVal.data[0].usage_idle).toFixed(0);
            setCpu(Number(value));
        } catch (e) {
            console.log("getCpuData error!");
        }
    };

    const getMemData = async () => {
        //setMem(0);
        try {
            const memVal = await getMcNetworksMem(mac);
            if (memVal.data[0].err === "nodata") {
                setErr("nodata");
            } else {
                setErr("");
            }
            setMem(Number(100 - memVal.data[0].available_percent.toFixed(0)));
        } catch (e) {
            console.log("getMemData error!");
        }
    };

    const getDiskData = async () => {
        //setDisk(0);
        try {
            const diskVal = await getMcNetworksDisk(mac);
            if (diskVal.data[0].err === "nodata") {
                setErr("nodata");
            } else {
                setErr("");
            }
            setDisk(Number(diskVal.data[0].used_percent.toFixed(0)));
        } catch (e) {
            console.log("getDiskData error!");
        }
    };

    /**************************************************************
     * useEffect
     **************************************************************/
    useEffect(() => {
        getData();
        getResourceData();

        const timer = setInterval(() => {
            getData();
            getResourceData();
        }, 10000);

        return () => clearInterval(timer);
    }, [mac]);

    return (
        <Fragment>
            {company !== "" ? (
                <div>
                    <Row className="classes.row">
                        <Col md={12} lg={12} xs={12} sm={12} xl={12} style={{padding: 10}}>
                            <NBSimpleCarousel
                                itemVal={3}
                                activeVal={1}
                                cpName={cpName}
                                vmCount={vmCount}
                            />
                        </Col>
                    </Row>
                    <Row className="classes.row">
                        <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                            <GraphSpeedometer
                                title="CPU"
                                data={cpu}
                                err={err}
                                refresh={getCpuData}
                            />
                        </Col>
                        <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                            <GraphSpeedometer
                                title="MEMORY"
                                data={mem}
                                err={err}
                                refresh={getMemData}
                            />
                        </Col>
                        <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                            <GraphSpeedometer
                                title="DISK"
                                data={disk}
                                err={err}
                                refresh={getDiskData}
                            />
                        </Col>
                        <Col md={6} lg={3} xs={12} sm={12} xl={3} style={{padding: 10}}>
                            <Row style={CountInfoStyle.size}>
                                <CountInfo title="VM 개수" count={vmCount}
                                           color={CountInfoStyle.color.vm}/>
                            </Row>
                            <Row style={CountInfoStyle.size}>
                                <CountInfo title="Snapshot 개수" count={snapshotCount}
                                           color={CountInfoStyle.color.snapshot}/>
                            </Row>
                            <Row style={CountInfoStyle.size}>
                                <CountInfo title="Backup 개수" count={backupCount}
                                           color={CountInfoStyle.color.backup}/>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} style={{padding: 10}}>
                            <MyResponsiveInfo
                                height={150}
                                mac={mac}
                                title="HOSTNAME"
                            />
                        </Col>
                        <Col md={9} style={{
                            padding: "10px 10px 0",
                            marginBottom: "10px",
                        }}>
                            <MyResponsiveLine height={350}
                                              title="BareMetal Out Interface"
                                              mac={mac}/>
                        </Col>
                    </Row>
                </div>
            ) : false}
        </Fragment>
    );
};

export default BaremetalMain;
