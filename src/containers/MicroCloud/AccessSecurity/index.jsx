import React from 'react';
import {Container, Row} from 'reactstrap';
import {SnackbarProvider} from "notistack";
import AccessSecurityToolbar from "./components/AccessSecurityToolbar";
import AccessSecurityTable from "./components/AccessSecurityTable";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const AccessSecurity = () => (
    <Container fluid>
        <Row>
            <RouterBreadcrumbs url={window.location.href}/>
        </Row>
        <Row>
            <SnackbarProvider maxSnack={3}>
                <AccessSecurityTable/>
            </SnackbarProvider>
        </Row>
    </Container>
);

export default AccessSecurity;
