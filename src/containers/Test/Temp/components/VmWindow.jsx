import React from 'react';
import {
    Card, Col, CardBody,
} from 'reactstrap';

const VmWindow = () => (
    <Col md={12} lg={12} xl={8} style={{
      paddingLeft: "0",
    }}>
        <Card style={{
          height: "auto",
        }}>
            <CardBody>
                WINDOW 화면
            </CardBody>
        </Card>
    </Col>
);

export default VmWindow;
