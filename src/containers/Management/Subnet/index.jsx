import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {SnackbarProvider} from "notistack";
import SubnetList from "./components/SubnetList";
import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";

const SubnetListCard = () => (
    <Container fluid>
        <Row>
            <Col>
                <Row style={{paddingLeft: 10}}>
                    <RouterBreadcrumbs url={window.location.href}/>
                </Row>
                <Row>
                    <SnackbarProvider maxSnack={3}>
                        <SubnetList />
                    </SnackbarProvider>
                </Row>
            </Col>
        </Row>
    </Container>
);

export default SubnetListCard;
