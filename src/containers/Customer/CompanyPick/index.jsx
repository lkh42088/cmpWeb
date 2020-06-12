import {Col, Container, Row} from "reactstrap";
import React from "react";
import PickCompany from "./components/PickCompany";

const CompaniesSetup = () => (
    <Container>
        <Row>
            <Col md={12}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h3 className="page-title-cb">MANAGER > 고객사관리 > Date Picker</h3>
                {/*<h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional*/}
                {/*    information*/}
                {/*</h3>*/}
                <PickCompany/>
            </Col>
        </Row>
    </Container>
);

export default CompaniesSetup;
