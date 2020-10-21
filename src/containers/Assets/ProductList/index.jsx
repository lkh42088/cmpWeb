import React, {useEffect, useState, Fragment} from 'react';
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';

import LoadingIcon from 'mdi-react/LoadingIcon';

import {
    fetchPosts, getCodes, postDevice, getDeviceOriByIdx, getDeviceByIdx,
    setDeviceMenuUrl, setAssetsPage, setDeviceSearchDivision,
} from '../../../redux/actions/assetsAction';
import * as common from "../../../lib/common";

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';
import AssetsView from "./components/AssetsView";

import RouterBreadcrumbs from "../../Layout/page/Breadcrumb";
import Loading from '../../../shared/components/Loading';

//TODO DIR ProductList 폴터 제거
const MaterialTable = () => {
    const assetState = useSelector(state => state.assets);
    const themeRd = useSelector(state => state.theme);
    const dispatch = useDispatch();
    /*const {
        title, getTitle,
    } = useSelector(({menuTitle}) => ({
        title: menuTitle,
    }));*/

    const [load, setLoad] = React.useState(true);

    /** Dense Padding */
    const {densePadding} = useSelector(({customizer}) => ({
        densePadding: customizer.densePadding,
    }));

    const [user, setUser] = useState(localStorage.getItem('user'));

    // TODO Reselect 사용으로 변경하기
    // eslint-disable-next-line no-shadow
    const getTotalCodes = () => dispatch(getCodes(assetState));
    // eslint-disable-next-line no-undef
    const getDevices = () => dispatch(fetchPosts(assetState));
    const getDeviceEdit = (deviceCode, deviceType) => dispatch(getDeviceByIdx(deviceCode, deviceType));
    const getDeviceEditOri = (deviceCode, deviceType) => dispatch(getDeviceOriByIdx(deviceCode, deviceType));

    const setMenuUrl = menuUrl => dispatch(setDeviceMenuUrl(menuUrl));

    useEffect(() => {
        setLoad(true);
        if (user != null) {
            const jsonUser = JSON.parse(user);
            setUser(jsonUser);
        }
    }, []);

    useEffect(() => {
        //console.log("😡  : ", common.assetsGetUrlMenu(window.location.href));
        setMenuUrl(common.assetsGetUrlMenu(window.location.href));
        dispatch(setDeviceSearchDivision(false));
    }, [window.location.href]);

    useEffect(() => {
        getTotalCodes();
    }, [assetState.deviceMenuUrl]);

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            //console.log("👹 clear");
        };
    }, [assetState.deviceMenuUrl, assetState.stateVal]);

    useEffect(() => {
        //console.log("useEffect assetState.deviceByDeviceCode : ", assetState.deviceByDeviceCode);
        if (assetState.deviceByDeviceCode !== undefined && assetState.deviceByDeviceCode !== '') {
            getDeviceEdit(assetState.deviceByDeviceCode, assetState.deviceType);
            getDeviceEditOri(assetState.deviceByDeviceCode, assetState.deviceType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetState.stateVal]);

    return (
        <Container fluid>
            {/*{load.loaded
            && (
                <div className="panel__refresh"><LoadingIcon /></div>
            )}*/}
            <Col sm={12} md={12} xs={12} xl={12} lg={12}>
                <Row>
                    <RouterBreadcrumbs url={window.location.href}/>
                </Row>
                {assetState.assetsPage === 'list' ? (
                    <Row style={{paddingBottom: 10}}>
                        <AssetsSearch assetState={assetState} user={user} theme={themeRd}/>
                    </Row>
                ) : false}
                <Row>
                    {assetState.assetsPage === 'list'
                        ? <AssetsList assetState={assetState} dispatch={dispatch} densePadding={densePadding} user={user}/> : false}
                    {assetState.assetsPage === 'view' || assetState.assetsPage === 'edit'
                        ? <AssetsView assetState={assetState} dispatch={dispatch} user={user} theme={themeRd}/> : false}

                </Row>
            </Col>
        </Container>
    );
};

export default MaterialTable;
