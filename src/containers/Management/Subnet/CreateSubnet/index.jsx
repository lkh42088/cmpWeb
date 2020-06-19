import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import SubnetWriteForm from "./components/SubnetWriteForm";
import SubnetHeader from "./components/SubnetHeader";

const SubnetWrite = () => (
    <Container>
        <Row>
            <Col md={12} >
                <SubnetHeader head="SUBNET Management > " subhead="SUBNET 등록" />
                <SubnetWriteForm />
            </Col>
        </Row>
    </Container>
);

export default SubnetWrite;
