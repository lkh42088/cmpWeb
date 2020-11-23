import React, {useEffect, useState} from 'react';
import {Col} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";
import VncDisplay from "react-vnc-display";
import {API_SERVER_IP, API_SERVER_WEBSOCK_PORT, HCMP_PUBLIC_MODE} from "../../../../lib/var/globalVariable";

const useStyles = makeStyles(theme => ({
    canvas: {
        display: 'block',
        width: '90vw',
        height: '90vh',
        border: '2px solid blue',
    },
}));

const VmVncViewer = ({vm}) => {
    const classes = useStyles();
    const [vncComponent, setVncComponent] = useState();

    useEffect(() => {
        setVncComponent("");
        let vncUrl;
        if (HCMP_PUBLIC_MODE === "yes") {
            vncUrl = `ws://${API_SERVER_IP}:${API_SERVER_WEBSOCK_PORT}/vnc/${vm.publicRemoteAddr.split(':')[0]}/${vm.vncPort}`;
        } else {
            vncUrl = `ws://${API_SERVER_IP}:${API_SERVER_WEBSOCK_PORT}/vnc/${vm.remoteAddr.split(':')[0]}/${vm.vncPort}`;
        }

        setTimeout(() => {
            setVncComponent(<VncDisplay className={classes.canvas} url={vncUrl}/>);
        }, 200);
    }, [vm]);

    //canvas {
    return (
        <Col md={12} lg={12} xl={8}>
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
