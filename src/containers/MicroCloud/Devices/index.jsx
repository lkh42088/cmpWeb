import React from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";
import ServerTable from "./components/ServerTable";

const MicroCloudDevices = () => {
    console.log("User Index");
    return (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    <ServerTable/>
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default MicroCloudDevices;
