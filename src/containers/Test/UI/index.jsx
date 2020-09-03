import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VmMain from './components/VmMain';

const Contents = () => (
  <Container>
    <div>
      <Row>
        <Col md={12} lg={12} xl={4}>
          <Row>
            <VmMain />
          </Row>
        </Col>
      </Row>
    </div>
  </Container>
);

export default Contents;
