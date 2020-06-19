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
    // TODO Reselect 사용으로 변경하기
    // eslint-disable-next-line no-shadow
    const getTotalCodes = () => dispatch(getCodes(assetState));
    // eslint-disable-next-line no-undef
    const getDevices = () => dispatch(fetchPosts(assetState));

    useEffect(() => {
        getTotalCodes();
    }, []);

    useEffect(() => {
        getDevices();
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
                {/*{assetState.codes.codeDeviceType !== undefined ? <AssetsSearch assetState={assetState} /> : false}*/}
                <AssetsSearch assetState={assetState} />
            </Row>
            <Row>
                {assetState.devices !== undefined ? <AssetsList assetState={assetState} dispatch={dispatch}/> : false}
            </Row>
        </Container>
    );
};

export default MaterialTable;
