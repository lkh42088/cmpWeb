import React from 'react';
import {Container, Row} from 'reactstrap';
import {SnackbarProvider} from "notistack";
import SnapTableToolbar from "./components/SnapTableToolbar";
import SnapshotTable from "./components/SnapshotTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const MicroCloudSnapshot = () => (
    <Container fluid>
        <Row>
            <RouterBreadcrumbs url={window.location.href}/>
        </Row>
        <Row>
            <SnackbarProvider maxSnack={3}>
                <SnapshotTable/>
            </SnackbarProvider>
        </Row>
    </Container>
);

export default MicroCloudSnapshot;
