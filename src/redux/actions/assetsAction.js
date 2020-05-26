import axios from 'axios';
import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICES_CHECKCOUNT = 'GET_DEVICES_CHECKCOUNT';
export const GET_DEVICE_BY_DEVICECODE = 'GET_DEVICE_BY_DEVICECODE';
export const GET_COMMENTS_BY_DEVICECODE = 'GET_COMMENTS_BY_DEVICECODE';
export const GET_CODES = 'GET_CODES';
export const GET_SUBCODES = 'GET_SUBCODES';

export const SET_DEVICE_DEVICECODE = 'SET_DEVICE_DEVICECODE';
export const SET_COMMENT = 'SET_COMMENT';

export const SET_STATUS = 'SET_STATUS';

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
    return val.map(d => d.Type === codeType && d.SubType === subType
        && ({
            CodeID: d.CodeID,
            Name: d.Name,
            Order: d.Order,
            SubType: d.SubType,
            Type: d.Type,
        }))
        .filter(d => d !== false);
}

//===================================================================================================

export const setState = dispatchVal => async (dispatch) => {
    dispatch({
        type: SET_STATUS,
        payload: dispatchVal,
    });
};

export const getCodes = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 getCodes start");
        console.log("dispatchVal : ", dispatchVal);
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

        //const codeType = "device_/"{dispatchVal.deviceType.toString()};
        const codeType = `device_${dispatchVal.deviceType}`;

        const DeviceType = setCodeMap(Codes.data, codeType, 'device_type_cd');
        const Manufacture = setCodeMap(Codes.data, codeType, 'manufacture_cd');
        const Ownership = setCodeMap(Codes.data, 'total', 'ownership_cd');
        const OwnershipDiv = setCodeMap(Codes.data, 'total', 'ownership_div_cd');
        const Idc = setCodeMap(Codes.data, 'total', 'idc_cd');
        const Size = setCodeMap(Codes.data, 'total', 'size_cd');
        const Spla = setCodeMap(Codes.data, 'total', 'spla_cd');
        const Customer = setCodeMap(Codes.data, 'total', 'customer_cd');

        const submitData = ({
            DeviceType,
            Manufacture,
            Ownership,
            OwnershipDiv,
            Idc,
            Size,
            Spla,
            Customer,
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
export const fetchPosts = dispatchVal => async (dispatch) => {
    try {
        console.log("💎 fetchPosts start");
        console.log("dispatchVal : ", dispatchVal);
        const rowsPerPage = checkUndefined(dispatchVal.rowsPerPage, 10);
        const orderBy = checkUndefined(dispatchVal.orderBy, "DeviceCode");
        const order = checkOrder(dispatchVal.order);

        const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/0/${dispatchVal.overNum}/${rowsPerPage}/${orderBy}/${order}`);

        dispatch({
            type: GET_DEVICES,
            payload: res.data,
            deviceType: dispatchVal.deviceType,
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
        let minNum;

        console.log("API_ROUTE/page/", dispatchVal.deviceType, "/0/", dispatchVal.overNum, "/", dispatchVal.checkPageNumCount, "/", dispatchVal.orderBy, "/", order);

        const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/0/${dispatchVal.overNum}/${dispatchVal.checkPageNumCount}/${dispatchVal.orderBy}/${order}`);

        console.log("res Devices : ", res.data.Devices[0].DeviceCode);
        console.log("res Devices : ", res.data.Devices[99].DeviceCode);

        if (dispatchVal.overNum === dispatchVal.checkPageNumCount) {
            minNum = -(dispatchVal.showPage);
        } else {
            minNum = 0;
        }

        dispatch({
            type: GET_DEVICES_CHECKCOUNT,
            payload: res.data,
            deviceType: dispatchVal.deviceType,
            page: dispatchVal.showPage + minNum,
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
        console.log(" getDeviceCommentByDeviceCode error : ", error);
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
export const postDeviceOutFlag = (assetState, outFlag) => async (dispatch) => {
    try {
        //todo 잠깐!! deviceCode 값 여러개일 수 있음 확인
        //API_ROUTE/device/outFlag/${type}/${deviceCode}/${outFlag}
        const res = await axios.get(`${API_ROUTE}/device/outFlag/${assetState.deviceType}/${assetState.deviceByDeviceCode}/${outFlag}`);
        dispatch({
            type: GET_DEVICES,
            payload: res.data,
            deviceType: assetState.deviceType,
        });
    } catch (error) {
        dispatch({
            type: GET_DEVICES,
            payload: undefined,
            deviceType: 'server',
        });
        console.log("submitDeviceOutFlag error : ", error);
    }
};
