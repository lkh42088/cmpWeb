import React from 'react';
import {Container, Row} from 'reactstrap';
import {SnackbarProvider} from "notistack";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import EnvConfiguration from "./components/EnvConfiguration";

const SystemControl = () => (
    <Container fluid>
        <Row>
            <RouterBreadcrumbs url={window.location.href}/>
        </Row>
        <Row>
            <SnackbarProvider maxSnack={3}>
                <EnvConfiguration />
            </SnackbarProvider>
        </Row>
    </Container>
);

export default SystemControl;
