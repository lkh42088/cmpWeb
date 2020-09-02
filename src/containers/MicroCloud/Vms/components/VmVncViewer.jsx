import React from 'react';
import {
    Card, Col, CardBody,
} from 'reactstrap';
import VncDisplay from "react-vnc-display";
import {API_SERVER_IP, API_SERVER_WEBSOCK_PORT} from "../../../../lib/var/globalVariable";

const VmVncViewer = ({vm}) => {
    console.log(vm);
    const remoteAddr = vm.remoteAddr.split(':');
    const vncurl = `ws://${API_SERVER_IP}:${API_SERVER_WEBSOCK_PORT}/vnc/${remoteAddr[0]}/${vm.vncPort}`;
    console.log(vncurl);
    return (
        <Col md={12} lg={12} xl={8} style={{
            paddingLeft: "0",
        }}>
            <Card style={{
                height: "auto",
            }}>
                <CardBody>
                    {/*<VncDisplay url="ws://192.168.0.89:8083/vnc/192.168.0.89/5900" />*/}
                    <VncDisplay url={vncurl} />
                </CardBody>
            </Card>
        </Col>
    );
};

export default VmVncViewer;
