import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import Assets from './components/Assets';
import AssetsList from './components/AssetsList';
import VerticalFormHalf from './components/VerticalFormHalf';

const MaterialTable = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">자산관리</h3>
                <h3 className="page-subhead subhead">서버</h3>
            </Col>
        </Row>
        <Row>
            <VerticalFormHalf/>
            <AssetsList/>
        </Row>
    </Container>
);

export default MaterialTable;
