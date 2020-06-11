import {Col, Container, Row} from "reactstrap";
import React from "react";
import CompanyMgmtList from "./components/CompanyMgmtList";

const CompaniesModule = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">고객사 관리</h3>
                <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                    information
                </h3>
            </Col>
            <CompanyMgmtList/>
        </Row>
    </Container>
);

export default CompaniesModule;
