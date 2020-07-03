import {Col, Container, Row} from "reactstrap";
import React from "react";
import { SnackbarProvider } from 'notistack';
import CompanyList from "./components/CompanyList";

const CompaniesModule = () => (
    <Container fluid="true">
        <Row>
            <Col md={12}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h3 className="page-title-cb">MANAGER &gt; 고객사관리</h3>
            </Col>
            <SnackbarProvider maxSnack={3}>
                <CompanyList/>
            </SnackbarProvider>
        </Row>
    </Container>
);

export default CompaniesModule;
