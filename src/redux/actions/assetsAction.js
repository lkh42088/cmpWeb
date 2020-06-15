import axios from 'axios';
import React from "react";
import {Map} from "immutable";

import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICES_CHECKCOUNT = 'GET_DEVICES_CHECKCOUNT';
export const GET_DEVICE_BY_DEVICECODE = 'GET_DEVICE_BY_DEVICECODE';
export const GET_DEVICE_ORI_BY_DEVICECODE = 'GET_DEVICE_ORI_BY_DEVICECODE';
export const GET_COMMENTS_BY_DEVICECODE = 'GET_COMMENTS_BY_DEVICECODE';
export const GET_CODES = 'GET_CODES';
export const GET_SUBCODES = 'GET_SUBCODES';
export const GET_COMPANIES = 'GET_COMPANIES';

export const SET_DEVICE_DEVICECODE = 'SET_DEVICE_DEVICECODE';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_STATUS = 'SET_STATUS';
export const SET_MODAL_DIVISION = 'SET_MODAL_DIVISION';
export const SET_ADD_ELE_IP_DATA = 'SET_ADD_ELE_IP_DATA';
export const SET_ADD_ELE_SPLA_DATA = 'SET_ADD_ELE_SPLA_DATA';
export const SET_DEVICE_SELECTED = 'SET_DEVICE_SELECTED';
export const SET_DEVICE_OUTFLAG = 'SET_DEVICE_OUTFLAG';
export const SET_DEVICE_TYPE = 'SET_DEVICE_TYPE';

// const API_ROUTE = 'http://127.0.0.1:8081/v1';
// order direction
// 0 : ASC
// 1 : DESC
function checkUndefined(val, reVal) {
    if (typeof val === 'undefined') {
        // eslint-disable-next-line no-param-reassign
        val = reVal;
    }
    return val;
}

function checkOrder(val) {
    if (typeof val === 'undefined' || val === 'asc') {
        val = 1;
    } else if (val === 'desc') {
        val = 0;
    }
    return val;
}

function setCodeMap(val, codeType, subType) {
    return val.map(d => d.type === codeType && d.subType === subType
        && ({
            codeId: d.codeId,
            name: d.name,
            order: d.order,
            subType: d.subType,
            type: d.type,
        }))
        .filter(d => d !== false);
}

function setJsonArray(name, value) {
    /*    deviceDataArray: {
            [name]: value,
        }*/
}

function removeHTML(text) {
    const tmpStr = /[<][^>]*[>]/gi;
    //text = text.replace("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
    return text.replace(tmpStr, "");
}

//===================================================================================================

export const setState = dispatchVal => async (dispatch) => {
    dispatch({
        type: SET_STATUS,
        payload: dispatchVal,
    });
};

export const setViewModalDivision = dispatchVal => async (dispatch) => {
    dispatch({
        type: SET_MODAL_DIVISION,
        payload: dispatchVal,
    });
};

export const getCodes = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 getCodes start");
        //console.log("dispatchVal : ", dispatchVal);
        // API_ROUTE/code/$(code)/$(subcode)
        const Codes = await axios.get(`${API_ROUTE}/codes`);
        // CodeID: 1
        // Name: "자사장비"
        // Order: 1
        // SubType: "ownership_cd_1"
        // Type: "total"
        const SubCodes = await axios.get(`${API_ROUTE}/subcodes`);
        // CodeID: 58
        // ID: 7
        // Name: "MCS 7800"
        // Order: 1

        const codeType = `device_${dispatchVal.deviceType}`;

        const DeviceType = setCodeMap(Codes.data, codeType, 'device_type_cd');
        const Manufacture = setCodeMap(Codes.data, codeType, 'manufacture_cd');
        const Ownership = setCodeMap(Codes.data, 'total', 'ownership_cd');
        const OwnershipDiv = setCodeMap(Codes.data, 'total', 'ownership_div_cd');
        const Idc = setCodeMap(Codes.data, 'total', 'idc_cd');
        const Size = setCodeMap(Codes.data, 'total', 'size_cd');
        const Spla = setCodeMap(Codes.data, 'total', 'spla_cd');
        const Customer = setCodeMap(Codes.data, 'total', 'customer_cd');
        const RackCode = setCodeMap(Codes.data, 'total', 'rack_code_cd');

        const submitData = ({
            DeviceType,
            Manufacture,
            Ownership,
            OwnershipDiv,
            Idc,
            Size,
            Spla,
            Customer,
            RackCode,
        });

        dispatch({
            type: GET_CODES,
            payload: submitData,
        });

        dispatch({
            type: GET_SUBCODES,
            payload: SubCodes,
        });
    } catch (error) {
        console.log("error : ", error);
    }
};

// first dispatch
export const fetchPosts = assetState => async (dispatch) => {
    try {
        // first get device
        console.log("💎 fetchPosts start");
       /* const rowsPerPage = checkUndefined(dispatchVal.rowsPerPage, 10);
        const orderBy = checkUndefined(dispatchVal.orderBy, "DeviceCode");
        const order = checkOrder(dispatchVal.order);
        console.log("dispatchVal : ", dispatchVal);

        /!*console.log("fetchPosts url -> ", `${API_ROUTE}/page/${dispatchVal.deviceType}/${dispatchVal.outFlag}/${dispatchVal.overNum}/${rowsPerPage}/${orderBy}/${order}`);*!/


        const dispatchVal = ({
            deviceType: 'server',
            orderBy: 'DeviceCode',
            order: 1,
            rowsPerPage: 10,
            overNum: 1000,
            outFlag: assetState.deviceOutFlag,
        });*/
        
        const deviceTypeData = assetState.deviceType;
        const orderBy = 'DeviceCode';
        const order = 1;
        const rowsPerPage = 10;
        const overNum = 10;
        const outFlag = assetState.deviceOutFlag;
        const limitPage = 10;
        const offsetPage = 0;
        console.log("fetchPosts url : ", `${API_ROUTE}/page/${deviceTypeData}/${outFlag}/${rowsPerPage}/1/${orderBy}/${order}`);

       /* const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/${dispatchVal.outFlag}/${dispatchVal.overNum}/${rowsPerPage}/${orderBy}/${order}`);*/
        const res = await axios.get(`${API_ROUTE}/page/${deviceTypeData}/${outFlag}/${rowsPerPage}/1/${orderBy}/${order}/${offsetPage}`);


        //console.log("res : ", res.data);

        dispatch({
            type: GET_DEVICES,
            payload: res.data,
            deviceType: deviceTypeData,
            page: 0,
        });
    } catch (error) {
        dispatch({
            type: GET_DEVICES,
            payload: undefined,
            deviceType: 'server',
            page: 0,
        });
        console.log("error : ", error);
    }
};

export const fetchPostsCheckCount = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 fetchPostsCheckCount start");
        const order = checkOrder(dispatchVal.order);
        const offsetPage = (dispatchVal.rowsPerPage * (dispatchVal.showPage));
        const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/${dispatchVal.outFlag}/${dispatchVal.rowsPerPage}/${dispatchVal.showPage + 1}/${dispatchVal.orderBy}/${order}/${offsetPage}`);

        console.log("★★★★★ dispatchVal : ", dispatchVal);

        dispatch({
            type: GET_DEVICES_CHECKCOUNT,
            payload: res.data,
            deviceType: dispatchVal.deviceType,
            page: dispatchVal.showPage,
        });
    } catch (error) {
        dispatch({
            type: GET_DEVICES_CHECKCOUNT,
            payload: undefined,
            deviceType: 'server',
            page: 0,
        });
        console.log(" fetchPostsCheckCount error : ", error);
    }
};

// 특정 장비 가져오기
export const getDeviceByIdx = (deviceCode, deviceType) => async (dispatch) => {
    try {
        console.log("💎 getDeviceByIdx start");
        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: deviceCode,
        });

        const res = await axios.get(`${API_ROUTE}/device/${deviceType}/${deviceCode}`);
        const comments = await axios.get(`${API_ROUTE}/comments/${deviceCode}`);

        //console.log("comments : ", comments.data);

        dispatch({
            type: GET_DEVICE_BY_DEVICECODE,
            payload: res.data,
            comment: comments.data,
        });
    } catch (error) {
        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: undefined,
        });
        dispatch({
            type: GET_DEVICE_BY_DEVICECODE,
            payload: undefined,
            comment: undefined,
        });
        console.log("error : ", error);
    }
};

// 특정 장비 ori 가져오기 (수정 시 사용)
export const getDeviceOriByIdx = (deviceCode, deviceType) => async (dispatch) => {
    try {
        // API_ROUTE/raw/device/$(type)/$(deviceCode)
        console.log("💎 getDeviceOriByIdx start");
        const res = await axios.get(`${API_ROUTE}/raw/device/${deviceType}/${deviceCode}`);

        console.log("특정 장비 ori res : ", res.data);
        console.log("deviceType : ", deviceType);

        let deviceIpArray = new Map();
        let deviceSplaArray = new Map();
        const jsonData = res.data[0];
        let IpArray = '';
        let SplaArray = '';
        let ipCheckCount = 1000;
        let splaCheckCount = 1000;

        switch (deviceType) {
            case 'server':
                IpArray = jsonData.ip.split("|");
                // eslint-disable-next-line no-loop-func,no-return-assign
                IpArray.map(d => (
                    d !== undefined && d !== "" && (
                        /*                ipCheckCount === 1000 ? (
                                            ipCheckCount += 1,
                                                deviceIpArray = deviceIpArray.set(`ip_0`, d)
                                        ) : (
                                            deviceIpArray = deviceIpArray.set(`ip_${ipCheckCount}`, d)
                                        )*/
                        deviceIpArray = deviceIpArray.set(`ip_${ipCheckCount}`, d),
                            ipCheckCount += 1
                    )));

                dispatch({
                    type: SET_ADD_ELE_IP_DATA,
                    payload: JSON.parse(JSON.stringify(deviceIpArray)),
                });


                SplaArray = jsonData.spla.split("|");
                // eslint-disable-next-line no-loop-func,no-return-assign
                SplaArray.map(d => (
                    d !== undefined && d !== "" && (
                        splaCheckCount === 1000 ? (
                            splaCheckCount += 1,
                                deviceSplaArray = deviceSplaArray.set(`spla0`, d)
                        ) : (
                            deviceSplaArray = deviceSplaArray.set(`spla${splaCheckCount}`, d)
                        )
                    )));

                dispatch({
                    type: SET_ADD_ELE_SPLA_DATA,
                    payload: JSON.parse(JSON.stringify(deviceSplaArray)),
                });

                break;
            case 'network':
                IpArray = jsonData.ip.split("|");
                // eslint-disable-next-line no-loop-func,no-return-assign
                IpArray.map(d => (
                    d !== undefined && d !== "" && (
                        /*                ipCheckCount === 1000 ? (
                                            ipCheckCount += 1,
                                                deviceIpArray = deviceIpArray.set(`ip_0`, d)
                                        ) : (
                                            deviceIpArray = deviceIpArray.set(`ip_${ipCheckCount}`, d)
                                        )*/
                        deviceIpArray = deviceIpArray.set(`ip_${ipCheckCount}`, d),
                            ipCheckCount += 1
                    )));

                dispatch({
                    type: SET_ADD_ELE_IP_DATA,
                    payload: JSON.parse(JSON.stringify(deviceIpArray)),
                });

                dispatch({
                    type: SET_ADD_ELE_SPLA_DATA,
                    payload: '',
                });
                break;
            case 'part':
                dispatch({
                    type: SET_ADD_ELE_IP_DATA,
                    payload: '',
                });

                dispatch({
                    type: SET_ADD_ELE_SPLA_DATA,
                    payload: '',
                });
                break;
            default:
                break;
        }

        // todo 이제는 굳이 시간 들여서 가져올 필요는 없음... 리팩토링 필요
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        /* for (const arrData in jsonData) {
             //console.log("arrData : ", arrData, ", value : ", jsonData[arrData]);

             if (arrData.indexOf("ip", 0) === 0) {
                 IpArray = jsonData[arrData].split("|");

                 // eslint-disable-next-line no-loop-func,no-return-assign
                 IpArray.map(d => (
                     d !== undefined && d !== "" && (
                         ipCheckCount === 1000 ? (
                             ipCheckCount += 1,
                                 deviceDataArray = deviceDataArray.set(`ip_0`, d)
                         ) : (
                             deviceDataArray = deviceDataArray.set(`ip_${ipCheckCount}`, d)
                         )
                     )));
             } else if (arrData.indexOf("spla", 0) === 0) {
                 SplaArray = jsonData[arrData].split("|");

                 // eslint-disable-next-line no-loop-func,no-return-assign
                 SplaArray.map(d => (
                     d !== undefined && d !== "" && (
                         splaCheckCount === 1000 ? (
                             splaCheckCount += 1,
                                 deviceDataArray = deviceDataArray.set(`spla0`, d)
                         ) : (
                             deviceDataArray = deviceDataArray.set(`spla${splaCheckCount}`, d)
                         )
                     )));
             } else if (arrData.indexOf("contents", 0) === 0) {
                 deviceDataArray = deviceDataArray.set(arrData, removeHTML(jsonData[arrData]));
             }
             deviceDataArray = deviceDataArray.set(arrData, jsonData[arrData]);
         }*/

        dispatch({
            type: GET_DEVICE_ORI_BY_DEVICECODE,
            payload: jsonData,
        });
    } catch (error) {
        console.log("error : ", error);
    }
};

// 고객사 name 명으로 검색하기
export const getCompanyByName = dispatchVal => async (dispatch) => {
    // API_ROUTE/companies/:name
    // GET_COMPANIES
    try {
        console.log("💎 getCompanyByName start");

        const res = await axios.get(`${API_ROUTE}/companies/${dispatchVal}`);

        //console.log("---> : ", res.data);

        dispatch({
            type: GET_COMPANIES,
            payload: res.data,
        });
    } catch (error) {
        console.log("getCompanyByName error : ", error);
    }
};

// 장비 댓글 list 가져오기
export const getDeviceCommentByDeviceCode = assetState => async (dispatch) => {
    try {
        console.log("💎 getDeviceCommentByDeviceCode start");
        //API_ROUTE/device/comments/${deviceCode}/${type}
        const comments = await axios.get(`${API_ROUTE}/comments/${assetState.deviceByDeviceCode}`);

        //console.log(assetState.deviceByDeviceCode, " -> comments : ", comments.data);

        const stateVal = ({
            type: 'comment',
            division: assetState.stateVal.division,
            state: 'finish',
        });
        dispatch({
            type: SET_STATUS,
            payload: stateVal,
        });
        dispatch({
            type: GET_COMMENTS_BY_DEVICECODE,
            comment: comments.data,
        });
    } catch (error) {
        dispatch({
            type: GET_COMMENTS_BY_DEVICECODE,
            comment: undefined,
        });
        console.log("getDeviceCommentByDeviceCode error : ", error);
    }
};

// 장비 cud
export const postDevice = (division, assetState, submitData) => async (dispatch) => {
    try {
        console.log("💎 postDevice start");
        let method = '';
        //"API_ROUTE/device/create/$(type)/"

        let url = `${API_ROUTE}/device/${division}/${assetState.deviceType}`;
        switch (division) {
            case 'create':
                method = 'post';
                break;
            case 'update':
                method = 'put';
                url = `${API_ROUTE}/device/${division}/${assetState.deviceType}/${submitData.deviceCode}`;
                break;
            case 'delete':
                method = 'delete';
                url = `${API_ROUTE}/device/${division}/${assetState.deviceType}/${submitData.idx}`;
                break;
            default:
                break;
        }

        const postJsonData = JSON.stringify(submitData);

        axios({
            method,
            url,
            data: postJsonData,
        })
            .then((response) => {
                const stateVal = ({
                    type: 'device',
                    division,
                    state: 'success',
                });
                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
                dispatch({
                    type: SET_MODAL_DIVISION,
                    payload: 'read',
                });
                dispatch({
                    type: GET_DEVICE_BY_DEVICECODE,
                    payload: postJsonData,
                    comment: assetState.comments,
                });
            })
            .catch((error) => {
                console.log('error : ', error.response);
                const stateVal = ({
                    type: 'device',
                    division,
                    state: 'error',
                });

                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            });
    } catch (error) {
        console.log("postDevice error : ", error);
    }
};


// 장비 댓글 cud
export const postDeviceComment = (division, assetState, submitData) => async (dispatch) => {
    try {
        console.log("💎 postDeviceComment start");
        let method = '';
        let url = `${API_ROUTE}/comment/${division}`;
        switch (division) {
            case 'create':
                method = 'post';
                break;
            case 'update':
                method = 'put';
                break;
            case 'delete':
                method = 'delete';
                url = `${API_ROUTE}/comment/${division}/${submitData.registerId}/${submitData.idx}`;
                break;
            default:
                break;
        }

        console.log("장비 댓글 cud submitData : ", submitData);

        const postJsonData = JSON.stringify(submitData);
        axios({
            method,
            url,
            data: postJsonData,
        })
            .then((response) => {
                const stateVal = ({
                    type: 'comment',
                    division,
                    state: 'success',
                });
                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            })
            .catch((error) => {
                console.log('error : ', error.response);
                const stateVal = ({
                    type: 'comment',
                    division,
                    state: 'error',
                });

                dispatch({
                    type: SET_STATUS,
                    payload: stateVal,
                });
            });
    } catch (error) {
        const stateVal = ({
            type: 'comment',
            division,
            state: 'error',
        });

        dispatch({
            type: SET_STATUS,
            payload: stateVal,
        });
        console.log("error : ", error);
    }
};

// 장비 반입/반출 update
export const postDeviceOutFlag = (assetState, dispatchVal) => async (dispatch) => {
    try {
        //todo 잠깐!! deviceCode 값 여러개일 수 있음 확인
        /*"API_ROUTE/devices/update/$(type)

        jsonData ->
        {""userId"":"""",""outFlag"":"""",""deviceCode"":""""}"*/
        const method = 'put';
        const url = `${API_ROUTE}/devices/update/${assetState.deviceType}`;
        const postJsonData = JSON.stringify(dispatchVal);

        //console.log("postJsonData : ", postJsonData);

        axios({
            method,
            url,
            data: postJsonData,
        })
            .then((response) => {
                console.log("success");
            })
            .catch((error) => {
                console.log('error : ', error.response);
                console.log("error");
            });
    } catch (error) {
        console.log("submitDeviceOutFlag error : ", error);
    }
};

// 수정 시 ip, spal 저장
export const setAddEleData = (type, value) => async (dispatch) => {
    try {
        console.log("💎 setAddEleData start"); //SET_ADD_ELE_IP_DATA

        let dispatchType = '';

        if (type === 'ip') {
            dispatchType = SET_ADD_ELE_IP_DATA;
        } else if (type === 'spla') {
            dispatchType = SET_ADD_ELE_SPLA_DATA;
        }

        dispatch({
            type: dispatchType,
            payload: value,
        });
    } catch (error) {
        console.log("setAddEleData error : ", error);
    }
};

// 리스트에서 selected redux 저장
export const setDeviceSelected = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceSelected start"); //SET_DEVICE_SELECTED

        dispatch({
            type: SET_DEVICE_SELECTED,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("setAddEleData error : ", error);
    }
};

// outFlag 저장
export const setDeviceOutFlag = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceOutFlag start"); //SET_DEVICE_SELECTED

        dispatch({
            type: SET_DEVICE_OUTFLAG,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("setDeviceOutFlag error : ", error);
    }
};

// deviceType 저장
export const setDeviceType = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 setDeviceType start"); //SET_DEVICE_TYPE

        dispatch({
            type: SET_DEVICE_TYPE,
            payload: dispatchVal,
        });
    } catch (error) {
        console.log("setDeviceType error : ", error);
    }
};
