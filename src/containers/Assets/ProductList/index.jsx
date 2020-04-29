import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';
import ComAssets from './components/ComAssets';

import {fetchPosts} from '../../../redux/actions/assetsAction';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => (
    <Container>
        <Row>
            <Col md={12} style={paddingCol}>
                <AssetsSearch/>
                <AssetsList/>
                <ComAssets/>
            </Col>
        </Row>
    </Container>
);

export default MaterialTable;
