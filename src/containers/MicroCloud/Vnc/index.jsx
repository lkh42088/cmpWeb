import React from 'react';
import {Container, Row} from 'reactstrap';
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import VncDisplayPanel from "./components/VncDisplayPanel";

const MicroCloudVnc = () => (
    <Container fluid>
        <Row>
            <RouterBreadcrumbs url={window.location.href}/>
        </Row>
        <Row>
            <VncDisplayPanel />
        </Row>
    </Container>
);

export default MicroCloudVnc;
