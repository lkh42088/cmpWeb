import React from 'react';
import {SnackbarProvider} from "notistack";
import { Col, Container, Row } from 'reactstrap';
import UserList from "./components/UserList";
import RouterBreadcrumbs from "../../Layout/sidebar/Breadcrumb";

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => {
    console.log("User Index");
    return (
        <Container fluid="true">
            <Row>
                <RouterBreadcrumbs url={window.location.href}/>
            </Row>
            <Row>
                {/*<Col md={12}>*/}
                {/*    <h3 className="page-title">MANAGER &gt; 계정 관리</h3>*/}
                {/*</Col>*/}
                <SnackbarProvider maxSnack={3}>
                    <UserList/>
                </SnackbarProvider>
            </Row>
        </Container>
    );
};

export default MaterialTable;
