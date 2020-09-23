import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';
import {getVmInfo} from "../../../../lib/api/microCloud";
import SmallTrafficMonitor from "./SmallTrafficMonitor";

const VmSidebar = ({vm}) => {
    const INTERVAL = 5;
    const mac = String(vm.mac.substring(3, 17));
    const [cpu, setCpu] = useState([]);
    const [mem, setMem] = useState([]);
    const [disk, setDisk] = useState([]);
    const [rx, setRx] = useState([]);
    const [tx, setTx] = useState([]);

    const getData = async () => {
        if (!mac) {
            return;
        }

        try {
            const response = await getVmInfo({mac});
            // console.log("TEST RESPONSE1: ", response.data.cpu);
            setCpu(
                response.data.cpu.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: 100 - val.y,
                })),
            );
            setMem(
                response.data.mem.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: val.y / 1024 / 1024,
                })),
            );
            setDisk(
                response.data.disk.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: vm.hdd - (val.y / 1024),
                })),
            );
            setRx(
                response.data.rx.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: (val.y * INTERVAL) / 1024,
                })),
            );
            setTx(
                response.data.tx.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: (val.y * INTERVAL) / 1024,
                })),
            );
        } catch {
            console.log("error!");
        }
    };

    useEffect(() => {
        if (vm.os.includes("win")) {
            getData();
        }
        const timer = setInterval(getData, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        /*<Col md={12} lg={12} xl={12}>*/
        <Col style={{
            width: "250px",
            // height: "90vh",
        }}>
            <Card>
                <CardBody className="vm__card">
                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-mainTitle">{vm.name}</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-title">CPU</p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.cpu} cores</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-title">RAM</p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.ram} MB</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-title">HDD</p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.hdd} GB</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-title">IP</p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.ipAddr}</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-title">내부접속 {vm.remoteAddr}</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat">
                            <p className="vm__stat-title"> 외부접속 119.1.1.10:15001</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={cpu} hostname="CPU (%)" stroke="#fdd835"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={mem} hostname="MEM (Mbytes)" stroke="#00e5ff"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={disk} hostname="DISK (Gbytes)" stroke="#546e7a"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={rx} hostname="RX (Kbytes)" stroke="#1565c0"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={tx} hostname="TX (Kbytes)" stroke="#ff8a65"/>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default VmSidebar;
