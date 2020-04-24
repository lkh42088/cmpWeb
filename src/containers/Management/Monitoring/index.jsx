import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import MonitoringList from './components/MonitoringList';
import MonitoringSearch from './components/MonitoringSearch';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => (
    <Container>
        <Row>
            <Col md={12} style={paddingCol}>
                <MonitoringSearch/>
                <MonitoringList/>
            </Col>
        </Row>
    </Container>
);

export default MaterialTable;
