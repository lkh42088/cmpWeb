import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import Assets from './components/Assets';
import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => (
    <Container>
        {/*<Row>
            <Col md={12}>
                <h3 className="page-title">자산관리 <span className="page-subhead subhead">&#60;서버</span></h3>
            </Col>
        </Row>*/}
        <Row>
            <Col md={12} style={paddingCol}>
                <AssetsSearch/>
                <AssetsList/>
            </Col>
        </Row>
    </Container>
);

export default MaterialTable;
