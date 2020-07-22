import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import SubnetList from "./components/SubnetList";
import RouterBreadcrumbs from "../../../Layout/sidebar/Breadcrumb";

const SubnetListCard = () => (
    <Container fluid>
        <Row>
            <Col>
                <Row style={{paddingLeft: 10}}>
                    <RouterBreadcrumbs url={window.location.href}/>
                </Row>
                <Row>
                    <SubnetList />
                </Row>
            </Col>
        </Row>
    </Container>
);

export default SubnetListCard;
