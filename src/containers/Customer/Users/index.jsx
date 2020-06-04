import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UserList from "./components/UserList";

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => (
    <Container>
        <Row>
            <Col md={12} style={paddingCol}>
                <UserList/>
            </Col>
        </Row>
    </Container>
);

export default MaterialTable;
