import React, {
    Fragment, useEffect, useRef, useState,
} from 'react';
import {Col, Container, Row} from 'reactstrap';

const ChartPie2 = () => {
    const data = [5, 20, 25, 30];
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div className="widget">
                        <div className="header">Batch Process Count {data}</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ChartPie2;
