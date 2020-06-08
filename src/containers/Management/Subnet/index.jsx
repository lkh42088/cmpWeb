import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import SubnetWriteForm from "./components/SubnetWriteForm";

const SubnetWrite = () => (
    <Container>
        <Row>
            <Col md={12} >
                <SubnetWriteForm />
            </Col>
        </Row>
    </Container>
);

export default SubnetWrite;
