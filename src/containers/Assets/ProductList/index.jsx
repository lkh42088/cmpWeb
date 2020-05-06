import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import {fetchPosts} from '../../../redux/actions/assetsAction';

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';
/*import ComAssets from './components/ComAssets';*/

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

const MaterialTable = () => {
    const assetState = useSelector(state => state.assets);
    const dispatch = useDispatch();

    const getDevices = () => dispatch(fetchPosts());

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row>
                <Col md={12} style={paddingCol}>
                    <AssetsSearch/>
                    <AssetsList assetState={assetState}/>
                    {/*<ComAssets/>*/}
                </Col>
            </Row>
        </Container>
    );
};

export default MaterialTable;
