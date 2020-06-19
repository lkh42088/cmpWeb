import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import SubnetHeader from "../CreateSubnet/components/SubnetHeader";
import SubnetList from "./components/SubnetList";

const SubnetListCard = () => (
    <Container>
        <Row>
            <Col md={12} >
                <SubnetHeader head="SUBNET Management > " subhead="SUBNET 목록" />
                <SubnetList />
            </Col>
        </Row>
    </Container>
);

export default SubnetListCard;
