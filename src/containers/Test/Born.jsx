import React, {Fragment, useEffect} from 'react';
import {Col, Container, Row} from 'reactstrap';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => {
    useEffect(() => {
    }, []);

    //.container__wrap
    return (
        <Container>
            <Row>
                <Col md={12} style={paddingCol}>
                    test
                </Col>
            </Row>
        </Container>
    );
};

export default MaterialTable;
