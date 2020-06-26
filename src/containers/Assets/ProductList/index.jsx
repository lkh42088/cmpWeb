import React, {useEffect, useState, Fragment} from 'react';
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import PropTypes from "prop-types";

import {emphasize, withStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    fetchPosts, getCodes, postDevice, getDeviceOriByIdx, getDeviceByIdx, setAssetsPage,
} from '../../../redux/actions/assetsAction';
import {MenuTitleProps} from '../../../shared/prop-types/ReducerProps';

import AssetsList from './components/AssetsList';
import AssetsSearch from './components/AssetsSearch';
import AssetsTop from './components/AssetsTop';
import AssetsView from "./components/AssetsView";
import AssetsEdit from "./components/AssetsEdit";
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
    } = useSelector(({menuTitle}) => ({
        title: menuTitle,
    }));
    // TODO Reselect 사용으로 변경하기
    // eslint-disable-next-line no-shadow
    const getTotalCodes = () => dispatch(getCodes(assetState));
    // eslint-disable-next-line no-undef
    const getDevices = () => dispatch(fetchPosts(assetState));
    const getDeviceEdit = (deviceCode, deviceType) => dispatch(getDeviceByIdx(deviceCode, deviceType));
    const getDeviceEditOri = (deviceCode, deviceType) => dispatch(getDeviceOriByIdx(deviceCode, deviceType));

    const StyledBreadcrumb = withStyles(theme => ({
        root: {
            backgroundColor: theme.palette.grey[100],
            height: theme.spacing(3),
            color: theme.palette.grey[800],
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.grey[300],
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(theme.palette.grey[300], 0.12),
            },
        },
    }))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

    useEffect(() => {
        getTotalCodes();
    }, []);

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    /*}, [assetState.deviceType, assetState.device, assetState.stateVal]);*/
    }, [assetState.deviceType, assetState.stateVal]);

    useEffect(() => {
        if (assetState.deviceByDeviceCode !== undefined && assetState.deviceByDeviceCode !== '') {
            getDeviceEdit(assetState.deviceByDeviceCode, assetState.deviceType);
            getDeviceEditOri(assetState.deviceByDeviceCode, assetState.deviceType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetState.stateVal]);

    return (
        <Container className="dashboard">
            <Row>
                <Col md={12}>
                    {/*<h3 className="page-title">{title.title}/{title.subTitle}</h3>*/}
                    <Breadcrumbs aria-label="breadcrumb" style={{paddingBottom: "10px"}}>
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="home"
                            icon={<HomeIcon fontSize="small"/>}
                        />
                        <StyledBreadcrumb component="a" href="#" label={title.title}/>
                        <StyledBreadcrumb component="a" href="#" label={title.subTitle}/>
                        {/*<StyledBreadcrumb
                            label={title.subTitle}
                            deleteIcon={<ExpandMoreIcon />}
                        />*/}
                    </Breadcrumbs>
                </Col>
            </Row>
            {assetState.assetsPage === 'list' ? (
                <Row>
                    <AssetsTop assetState={assetState} dispatch={dispatch}/>
                    {/*{assetState.codes.codeDeviceType !== undefined ? <AssetsSearch assetState={assetState} /> : false}*/}
                    <AssetsSearch assetState={assetState}/>
                </Row>
            ) : false}
            <Row>
                {assetState.assetsPage === 'list'
                    ? <AssetsList assetState={assetState} dispatch={dispatch}/> : false}
                {assetState.assetsPage === 'view' || assetState.assetsPage === 'edit'
                    ? <AssetsView assetState={assetState} dispatch={dispatch}/> : false}
                {/*{assetState.assetsPage === 'edit'
                    ? <AssetsEdit assetState={assetState} dispatch={dispatch} onSubmit={handleSubmit}/> : false}*/}
            </Row>
        </Container>
    );
};

export default MaterialTable;
