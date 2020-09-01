import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VmMain from './components/VmMain';
import VmWindow from './components/VmWindow';

const Contents = () => (
  <Container>
    <div>
      <Row>
        {/*<Col md={12} lg={12} xl={4}>*/}
        <Col style={{
          flexGrow: "0",
        }}>
          <Row>
            <VmMain />
          </Row>
        </Col>
        <VmWindow />
      </Row>
    </div>
  </Container>
);

export default Contents;
