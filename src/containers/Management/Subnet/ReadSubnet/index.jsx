import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import SubnetHeader from "../CreateSubnet/components/SubnetHeader";
import SubnetList from "./components/SubnetList";
import RouterBreadcrumbs from "../../../Layout/sidebar/Breadcrumb";

const SubnetListCard = () => (
    <Container fluid>
        <Row>
            <Col>
                <Row>
                    <RouterBreadcrumbs url={window.location.href}/>
                </Row>
                <Row>
                    <SubnetList />
                </Row>
                {/*<SubnetHeader head="SUBNET Management > " subhead="SUBNET 목록" />*/}
            </Col>
        </Row>
    </Container>
);

export default SubnetListCard;
