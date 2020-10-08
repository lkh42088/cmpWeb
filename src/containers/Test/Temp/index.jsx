import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VmMain from './components/VmMain';
import VmWindow from './components/VmWindow';

import Component01 from './components/Component01';
import Component02 from './components/Component02';
import Component03 from './components/Component03';

const Contents = () => (
  <Container>
    <div>
      <Row>
        <Col md={12} lg={12} xl={6}>
          <Component01 type="setting"/>
        </Col>
        <Col md={12} lg={12} xl={6}>
          <Component01 type="status"/>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={12} xl={6}>
          <Component03 />
          <Component03 />
        </Col>
        <Col md={12} lg={12} xl={6}>
          <Component02 />
          <Component02 />
        </Col>
      </Row>
    </div>
  </Container>
);

export default Contents;
