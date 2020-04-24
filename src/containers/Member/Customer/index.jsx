import React from 'react';
import {Col, Container, Row} from 'reactstrap';

import CustomerList from './components/CustomerList';
import CustomerSearch from './components/CustomerSearch';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => (
    <Container>
        <Row>
            <Col md={12} style={paddingCol}>
                <CustomerSearch/>
                <CustomerList/>
            </Col>
        </Row>
    </Container>
);

export default MaterialTable;
