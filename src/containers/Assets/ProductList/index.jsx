import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import PropTypes from "prop-types";
import {fetchPosts, getCodes, setDeviceOutFlag} from '../../../redux/actions/assetsAction';
import {MenuTitleProps} from '../../../shared/prop-types/ReducerProps';

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';
import AssetsTop from './components/AssetsTop';
import VisitorsSessions from './components/VisitorsSessions';

const paddingCol = {
    paddingRight: '0px',
    paddingLeft: '0px',
};

//TODO DIR ProductList 폴터 제거
const MaterialTable = () => {
    const assetState = useSelector(state => state.assets);
    const dispatch = useDispatch();
    const {
        title, getTitle,
    } = useSelector(({ menuTitle }) => ({
        title: menuTitle,
    }));

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

    // eslint-disable-next-line no-undef
    const getDevices = () => dispatch(fetchPosts(assetState));
    // TODO Reselect 사용으로 변경하기
    const getTotalCodes = () => dispatch(getCodes(assetState));
    // eslint-disable-next-line no-shadow

/*    useEffect(() => {
        getDevices();
        getTotalCodes();
        //console.log("💋💋💋💋💋💋 ~~~> : ", assetState.deviceType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetState.deviceType]);*/
    useEffect(() => {
        getDevices();
        getTotalCodes();
        //console.log("💋💋💋💋💋💋 ~~~> : ", assetState.deviceType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetState.deviceType, assetState.device]);

    return (
        <Container className="dashboard">
            <Row>
                <Col md={12}>
                    <h3 className="page-title">{title.title}/{title.subTitle}</h3>
                </Col>
            </Row>
            <Row>
                <AssetsTop assetState={assetState} dispatch={dispatch}/>
                <AssetsSearch/>
            </Row>
            <Row>
                <AssetsList assetState={assetState} dispatch={dispatch}/>
            </Row>
        </Container>
    );
};

export default MaterialTable;
