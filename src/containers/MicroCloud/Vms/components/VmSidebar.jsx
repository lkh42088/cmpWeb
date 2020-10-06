import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, CardHeader, Col,
} from 'reactstrap';
import SmallTrafficMonitor from "./SmallTrafficMonitor";
import {getVmInfo} from "../../../../lib/api/microCloud";

const VmSidebar = ({vm}) => {
    const INTERVAL = 5;
    const mac = String(vm.mac.substring(3, 17));
    const [cpu, setCpu] = useState([]);
    const [mem, setMem] = useState([]);
    const [disk, setDisk] = useState([]);
    const [rx, setRx] = useState([]);
    const [tx, setTx] = useState([]);
    const [cpuTitle, setCpuTitle] = useState("CPU (%)");
    const [memTitle, setMemTitle] = useState("MEM (Mbytes)");
    const [diskTitle, setDiskTitle] = useState("DISK (Gbytes)");
    const [rxTitle, setRxTitle] = useState("RX (Kbytes)");
    const [txTitle, setTxTitle] = useState("TX (Kbytes)");

    console.log("🙉🙉 VMSIDEBAR : ", vm);

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
                    y: (100 - val.y).toFixed(1),
                })),
            );
            setMem(
                response.data.mem.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: (val.y / 1024 / 1024).toFixed(1),
                })),
            );
            setDisk(
                response.data.disk.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: (vm.hdd - (val.y / 1024)).toFixed(1),
                })),
            );
            setRx(
                response.data.rx.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: ((val.y * INTERVAL) / 1024).toFixed(1),
                })),
            );
            setTx(
                response.data.tx.data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: ((val.y * INTERVAL) / 1024).toFixed(1),
                })),
            );
        } catch {
            console.log("error!");
        }
    };

    useEffect(() => {
        if (cpu.length > 0) {
            setCpuTitle(`CPU (${cpu[cpu.length - 1].y} %)`);
        }
        if (mem.length > 0) {
            setMemTitle(`MEM (${mem[mem.length - 1].y} Mbytes)`);
        }
        if (disk.length > 0) {
            setDiskTitle(`DISK (${disk[disk.length - 1].y} Gbytes)`);
        }
        if (rx.length > 0) {
            setRxTitle(`RX (${rx[rx.length - 1].y} Kbytes)`);
        }
        if (tx.length > 0) {
            setTxTitle(`TX (${tx[tx.length - 1].y} Kbytes)`);
        }
    }, [cpu, mem, disk, rx, tx]);

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
                <CardHeader
                    className={vm.currentStatus === 'running'
                        ? "vm__card_header-running" : "vm__card_header"}
                    style={{textAlign: "center"}}
                >
                    {vm.name}
                </CardHeader>
                <CardBody className="vm__card">
                    <div className="vm__stats">
                        <div className="vm__stat" style={{width: "60%"}}>
                            <p className="vm__stat-title"><b>CPU</b></p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.cpu} cores</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat" style={{width: "60%"}}>
                            <p className="vm__stat-title"><b>RAM</b></p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.ram} MB</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat" style={{width: "60%"}}>
                            <p className="vm__stat-title"><b>HDD</b></p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.hdd} GB</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat" style={{width: "60%"}}>
                            <p className="vm__stat-title"><b>IP</b></p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.ipAddr}</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat" style={{width: "60%"}}>
                            <p className="vm__stat-title"><b>내부접속</b></p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">{vm.remoteAddr}</p>
                        </div>
                    </div>

                    <div className="vm__stats" style={{borderBottom: "0px"}}>
                        <div className="vm__stat" style={{width: "60%"}}>
                            <p className="vm__stat-title"><b>외부접속</b> </p>
                        </div>
                        <div className="vm__stat">
                            <p className="vm__stat-title">-</p>
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={cpu} hostname={cpuTitle} stroke="#fdd835"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={mem} hostname={memTitle} stroke="#00e5ff"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={disk} hostname={diskTitle} stroke="#546e7a"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={rx} hostname={rxTitle} stroke="#1565c0"/>
                        </div>
                    </div>
                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={tx} hostname={txTitle} stroke="#ff8a65"/>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default VmSidebar;
