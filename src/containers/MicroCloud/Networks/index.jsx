import React from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import NetworkTable from "./components/NetworkTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const MicroCloudNetworkTable = () => (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    <NetworkTable/>
                </SnackbarProvider>
            </Row>
        </Container>
    );

export default MicroCloudNetworkTable;
