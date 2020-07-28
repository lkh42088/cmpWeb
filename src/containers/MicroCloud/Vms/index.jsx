import React from 'react';
import {SnackbarProvider} from "notistack";
import { Col, Container, Row } from 'reactstrap';
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";
import VmTable from "./components/VmTable";

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MicroCloudVmTable = () => {
    console.log("User Index");
    return (
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
};

export default MicroCloudVmTable;
