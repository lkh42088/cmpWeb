import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';
import {getVmInterfaceTraffic} from "../../../../lib/api/microCloud";
import SmallTrafficMonitor from "./SmallTrafficMonitor";

const __VmSidebar = ({vm}) => {
    const mac = String(vm.mac.substring(3, 17));
    const [rx, setRx] = useState([]);
    const [tx, setTx] = useState([]);

    const getData = async () => {
        if (!mac) {
            return;
        }

        try {
            const response = await getVmInterfaceTraffic({mac});
            // console.log("TEST RESPONSE1: ", response.data.stats[0].data);
            setRx(
                response.data.stats[0].data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: val.y / 1024,
                })),
            );
            setTx(
                response.data.stats[1].data.map(val => ({
                    x: new Date(val.x).toLocaleTimeString().split(" ")[1],
                    y: val.y / 1024,
                })),
            );
        } catch {
            console.log("error!");
        }
    };

    useEffect(() => {
        getData();
        const timer = setInterval(getData, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        /*<Col md={12} lg={12} xl={12}>*/
        <Col style={{
            width: "250px",
            height: "90vh",
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
                            <SmallTrafficMonitor data={rx} hostname="RX (Kbytes)" />
                        </div>
                    </div>

                    <div className="vm__stats">
                        <div className="vm__stat_graph">
                            <SmallTrafficMonitor data={tx} hostname="TX (Kbytes)" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default __VmSidebar;
