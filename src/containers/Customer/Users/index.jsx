import React from 'react';
import {SnackbarProvider} from "notistack";
import { Container, Row } from 'reactstrap';
import UserList from "./components/UserList";
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";

const MaterialTable = () => (
        <Container fluid>
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                <SnackbarProvider maxSnack={3}>
                    <UserList/>
                </SnackbarProvider>
            </Row>
        </Container>
    );

export default MaterialTable;
