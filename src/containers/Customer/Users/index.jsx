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
            <Col md={12}>
                <h3 className="page-title">MANAGER &gt; 계정 관리</h3>
            </Col>
            <UserList/>
        </Row>
    </Container>
);

export default MaterialTable;
