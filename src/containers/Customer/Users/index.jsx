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
                <h3 className="page-title">고객사 계정 정보</h3>
                <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                    information
                </h3>
            </Col>
            <UserList/>
        </Row>
    </Container>
);

export default MaterialTable;
