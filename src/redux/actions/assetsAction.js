import axios from 'axios';
import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICES_CHECKCOUNT = 'GET_DEVICES_CHECKCOUNT';
export const GET_DEVICE_BY_DEVICECODE = 'GET_DEVICE_BY_DEVICECODE';
export const GET_COMMENTS_BY_DEVICECODE = 'GET_COMMENTS_BY_DEVICECODE';

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

/*export const fetchPosts = (type, page, checkPageNumCount, orderBy, order, overNum) => async (dispatch) => {*/
export const setState = dispatchVal => async (dispatch) => {
/*    const stateVal = ({
        type: dispatchVal.type,
        division: dispatchVal.division,
        state: dispatchVal.state,
    });*/
    dispatch({
        type: SET_STATUS,
        payload: dispatchVal,
    });
};


export const fetchPosts = dispatchVal => async (dispatch) => {
    try {
        const rowsPerPage = checkUndefined(dispatchVal.rowsPerPage, 10);
        const orderBy = checkUndefined(dispatchVal.orderBy, "DeviceCode");
        const order = checkOrder(dispatchVal.order);

        /*console.log("API_ROUTE/page/", dispatchVal.deviceType, "/0/", dispatchVal.overNum, "/", rowsPerPage, "/", orderBy, "/", order);*/
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
/*
export const fetchPostsCheckCount = (type, page, checkPageNumCount, orderBy, order, rowsPerPage, showPage, overNum) => async (dispatch) => {*/

export const fetchPostsCheckCount = dispatchVal => async (dispatch) => {
    try {
        const order = checkOrder(dispatchVal.order);
        let minNum;

/*        console.log("API_ROUTE/page/", dispatchVal.deviceType, "/0/", dispatchVal.overNum, "/", dispatchVal.checkPageNumCount, "/", dispatchVal.orderBy, "/", order);*/

        const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/0/${dispatchVal.overNum}/${dispatchVal.checkPageNumCount}/${dispatchVal.orderBy}/${order}`);

        //console.log("res Devices : ", res.data.Devices[0].Idx);

        if (dispatchVal.overNum === dispatchVal.checkPageNumCount) {
            minNum = -(dispatchVal.showPage);
        } else {
            minNum = 0;
        }
        /*        console.log("fetch page : dispatchVal.showPage(", dispatchVal.showPage, ") + minNum(", minNum, ") = ", dispatchVal.showPage + minNum);*/

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

/*export const setDeviceIdx = val => async (dispatch) => {
    try {
        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: val,
        });
    } catch (error) {
        dispatch({
            type: SET_DEVICE_DEVICECODE,
            payload: undefined,
        });
        console.log("error : ", error);
    }
};*/

// 특정 장비 가져오기
export const getDeviceByIdx = (deviceCode, deviceType) => async (dispatch) => {
    try {
        //router.GET("/v1/device/:type/:deviceCode", h.GetDevicesByIdx)
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
/*
const assetsActions = {
    addASSETS(equCode, division, manufacturer, model, ip, ownership,
              ownershipDivision, customer, idc, size, usage) {
        return {
            type: 'ADD_ASSETS',
            equCode,
            division,
            manufacturer,
            model,
            ip,
            ownership,
            ownershipDivision,
            customer,
            idc,
            size,
            usage,
        };
    },
};
export default assetsActions;*/
