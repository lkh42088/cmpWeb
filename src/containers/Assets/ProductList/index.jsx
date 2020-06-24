import React, {useEffect, useState} from 'react';
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import {Col, Container, Row} from 'reactstrap';
import PropTypes from "prop-types";
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

    const handleSubmit = (values) => {
        let division = '|';
        let divisionCount = 0;
        let IpArray = '';
        let SplaArray = '';
        let rentDataStart;
        let rentDataEnd;
        let rentData = '|';
        let warehousingDate = '';

        console.log("👋 assetState.deviceIp : ", assetState.deviceIp);

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceIp) {
            console.log("👋👋 assetState.deviceIp[arrData] : ", assetState.deviceIp[arrData]);
            if (assetState.deviceIp[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                IpArray = `${IpArray}${division}${assetState.deviceIp[arrData]}`;
            }
        }

        divisionCount = 0;
        IpArray = `${IpArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceSpla) {
            if (assetState.deviceSpla[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                SplaArray = `${SplaArray}${division}${assetState.deviceSpla[arrData]}`;
            }
        }

        SplaArray = `${SplaArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in values) {
            if (arrData.indexOf("rentDate") !== -1) {
                if (values[arrData].start !== undefined) {
                    rentDataStart = moment(values[arrData].start).format("YYYYMMDD");
                    rentDataEnd = `|${moment(values[arrData].end).format("YYYYMMDD")}`;
                    rentData = `${rentDataStart}${rentDataEnd}`;
                } else if (values[arrData] !== '' && values[arrData] !== undefined) {
                    rentData = values[arrData];
                } else {
                    rentData = "|";
                }
            } else if (arrData.indexOf("warehousingDate") !== -1) {
                warehousingDate = moment(values[arrData]).format("YYYYMMDD");
            }
        }

        warehousingDate = warehousingDate.toString();

        let rackLog;

        if (values.rackLoc !== undefined) {
            rackLog = values.rackLoc.toString();
        } else {
            rackLog = 0;
        }

        const submitData = ({
            deviceCode: values.deviceCode,
            idx: values.idx,
            outFlag: '',
            commentCnt: '',
            commentLastDate: '',
            registerId: 'lkb',
            registerDate: '',
            model: values.model,
            contents: values.contents,
            customer: values.customer,
            manufacture: values.manufacture,
            deviceType: values.deviceType,
            ownership: values.ownership,
            ownershipDiv: values.ownershipDiv,
            ownerCompany: values.ownerCompany,
            hwSn: values.hwSn,
            idc: values.idc,
            rack: values.rack,
            cost: values.cost,
            purpose: values.purpose,
            size: values.size,
            cpu: values.cpu,
            memory: values.memory,
            hdd: values.hdd,
            rackTag: values.rackTag,
            rackLog,
            ip: IpArray,
            spla: SplaArray,
            rentDate: rentData,
            warehousingDate,
            monitoringFlag: '',
            monitoringMethod: '',
            rackCode: values.rackCode,
            firmwareVersion: values.firmwareVersion,
            warranty: values.warranty,
        });

        console.log("UPDATE 🙊🙊🙊 가공 전 : ", values);
        console.log("UPDATE 🙊🙊🙊 가공 후 : ", submitData);
        dispatch(postDevice('update', assetState, submitData));
        getDeviceEdit(values.deviceCode, assetState.deviceType);
        //getDeviceEditOri(values.deviceCode, assetState.deviceType);
    };


    useEffect(() => {
        getTotalCodes();
    }, []);

    useEffect(() => {
        getDevices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetState.deviceType, assetState.device, assetState.stateVal]);

    return (
        <Container className="dashboard">
            <Row>
                <Col md={12}>
                    <h3 className="page-title">{title.title}/{title.subTitle}</h3>
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
                {assetState.assetsPage === 'view'
                    ? <AssetsView assetState={assetState} dispatch={dispatch}/> : false}
                {assetState.assetsPage === 'edit'
                    ? <AssetsEdit assetState={assetState} dispatch={dispatch} onSubmit={handleSubmit}/> : false}
            </Row>
        </Container>
    );
};

export default MaterialTable;
