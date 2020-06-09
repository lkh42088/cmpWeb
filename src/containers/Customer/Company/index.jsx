import {Col, Container, Row} from "reactstrap";
import React from "react";
import CompanyList from "./components/CompanyList";

const CompaniesModule = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">고객사 정보</h3>
                <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                    information
                </h3>
            </Col>
            <CompanyList/>
        </Row>
    </Container>
);

export default CompaniesModule;
