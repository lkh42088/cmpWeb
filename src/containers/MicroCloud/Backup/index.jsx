import React from 'react';
import {Container, Row} from 'reactstrap';
import {SnackbarProvider} from "notistack";
import BackupTableToolbar from "./components/BackupTableToolbar";
import BackupTable from "./components/BackupTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const MicroCloudBackup = () => (
    <Container fluid>
        <Row>
            <RouterBreadcrumbs url={window.location.href}/>
        </Row>
        <Row>
            <SnackbarProvider maxSnack={3}>
                <BackupTable/>
            </SnackbarProvider>
        </Row>
    </Container>
);

export default MicroCloudBackup;
