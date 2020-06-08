import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import {fetchPosts, getCodes, setDeviceOutFlag} from '../../../redux/actions/assetsAction';

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';
import AssetsTop from './components/AssetsTop';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

//TODO DIR ProductList 폴터 제거
const MaterialTable = () => {
    const assetState = useSelector(state => state.assets);
    const dispatch = useDispatch();

    //console.log("최상위 index assetState : ", assetState);

    //overNum 값 10으로 test 한다면 list component의 overPageCheckr값 다시 설정해야함
    // todo 다시 확인...
    const dispatchVal = ({
        deviceType: 'server',
        orderBy: 'DeviceCode',
        order: 1,
        rowsPerPage: 10,
        overNum: 1000,
        outFlag: assetState.deviceOutFlag,
    });

    const getDevices = () => dispatch(fetchPosts(dispatchVal));
    // TODO Reselect 사용으로 변경하기
    const getTotalCodes = () => dispatch(getCodes(dispatchVal));
    // eslint-disable-next-line no-shadow

    useEffect(() => {
        getDevices();
        getTotalCodes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row>
                <Col md={12} style={paddingCol}>
                    <AssetsTop assetState={assetState} dispatch={dispatch}/>
                    <AssetsSearch/>
                    <AssetsList assetState={assetState} dispatch={dispatch}/>
                </Col>
            </Row>
        </Container>
    );
};

export default MaterialTable;
