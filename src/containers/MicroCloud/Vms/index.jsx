import React from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import VmTable from "./components/VmTable";
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";

const MicroCloudVmTable = () => (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    <VmTable/>
                </SnackbarProvider>
            </Row>
        </Container>
    );

export default MicroCloudVmTable;
