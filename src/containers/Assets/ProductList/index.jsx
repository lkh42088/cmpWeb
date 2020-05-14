import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import {fetchPosts} from '../../../redux/actions/assetsAction';

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => {
    const assetState = useSelector(state => state.assets);
    const dispatch = useDispatch();

    //console.log("최상위 index assetState : ", assetState);

    const getDevices = () => dispatch(fetchPosts('server'));

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row>
                <Col md={12} style={paddingCol}>
                    <AssetsSearch/>
                    <AssetsList assetState={assetState} dispatch={dispatch}/>
                </Col>
            </Row>
        </Container>
    );
};

export default MaterialTable;
