import React, {useEffect, useState} from 'react';
import {Col} from 'reactstrap';
import VncDisplay from "react-vnc-display";
import {API_SERVER_IP, API_SERVER_WEBSOCK_PORT} from "../../../../lib/var/globalVariable";

const VmVncViewer = ({vm}) => {
    console.log("VmVncViewer vm : ", vm);
    const [vncComponent, setVncComponent] = useState();

    useEffect(() => {
        setVncComponent("");
        const vncUrl = `ws://${API_SERVER_IP}:${API_SERVER_WEBSOCK_PORT}/vnc/${vm.remoteAddr.split(':')[0]}/${vm.vncPort}`;

        setTimeout(() => {
            setVncComponent(<VncDisplay url={vncUrl}/>);
        }, 200);
    }, [vm]);

    return (
        <Col md={12} lg={12} xl={8} style={{
            paddingLeft: "0",
        }}>
            {/*
               <Card style={{
                height: "auto",
            }}>
                <CardBody>
                    <VncDisplay url="ws://192.168.0.89:8083/vnc/192.168.0.89/5900" />
                    <VncDisplay url={vncurl} />
                </CardBody>
            </Card>
*/}
            {vncComponent}
        </Col>
    );
};

export default VmVncViewer;
