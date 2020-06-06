import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import SubnetWriteForm from "./components/SubnetWriteForm";

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const SubnetWrite = () => (
    <Container>
        <Row>
            <Col md={12} style={paddingCol}>
                <SubnetWriteForm />
            </Col>
        </Row>
    </Container>
);

export default SubnetWrite;
