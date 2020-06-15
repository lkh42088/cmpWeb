import {Col, Container, Row} from "reactstrap";
import React from "react";
import InsertCompany from "./components/InsertCompany";

const CompaniesSetup = () => (
    <Container>
        <Row>
            <Col md={12}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h3 className="page-title-cb">MANAGER > 고객사관리 > 고객사 설정</h3>
                {/*<h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional*/}
                {/*    information*/}
                {/*</h3>*/}
                <InsertCompany/>
            </Col>
        </Row>
    </Container>
);

export default CompaniesSetup;
