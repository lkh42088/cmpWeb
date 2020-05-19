import axios from 'axios';
import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICES_CHECKCOUNT = 'GET_DEVICES_CHECKCOUNT';
export const GET_DEVICE_BY_DEVICECODE = 'GET_DEVICE_BY_DEVICECODE';
export const GET_COMMENTS_BY_DEVICECODE = 'GET_COMMENTS_BY_DEVICECODE';

export const SET_DEVICE_DEVICECODE = 'SET_DEVICE_DEVICECODE';
export const SET_COMMENT = 'SET_COMMENT';

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
export const fetchPosts = dispatchVal => async (dispatch) => {
    try {
        console.log(" ◥◣‸◢◤  fetchPosts 시작!");
        const rowsPerPage = checkUndefined(dispatchVal.rowsPerPage, 10);
        const orderBy = checkUndefined(dispatchVal.orderBy, "DeviceCode");
        const order = checkOrder(dispatchVal.order);

        console.log("API_ROUTE/page/", dispatchVal.deviceType, "/0/100/", rowsPerPage, "/", orderBy, "/", order);
        const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/0/100/${rowsPerPage}/${orderBy}/${order}`);

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
        console.log(" ◥◣‸◢◤ fetchPostsCheckCount 시작!");

        const order = checkOrder(dispatchVal.order);

        console.log("API_ROUTE/page/", dispatchVal.deviceType, "/0/100/", dispatchVal.checkPageNumCount, "/", dispatchVal.orderBy, "/", order);

        const res = await axios.get(`${API_ROUTE}/page/${dispatchVal.deviceType}/0/100/${dispatchVal.checkPageNumCount}/${dispatchVal.orderBy}/${order}`);

        dispatch({
            type: GET_DEVICES_CHECKCOUNT,
            payload: res.data,
            deviceType: dispatchVal.deviceType,
            page: dispatchVal.showPage + 1,
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

export const setDeviceIdx = val => async (dispatch) => {
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
};

// 특정 장비 가져오기
export const getDeviceByIdx = (deviceCode, deviceType) => async (dispatch) => {
    try {
        console.log(" ◥◣‸◢◤ getDeviceByIdx 시작!");
        //router.GET("/v1/device/:type/:deviceCode", h.GetDevicesByIdx)
        const res = await axios.get(`${API_ROUTE}/device/${deviceType}/${deviceCode}`);
        const comments = await axios.get(`${API_ROUTE}/comments/${deviceCode}`);

        /*        dispatch({
                    type: SET_DEVICE_DEVICECODE,
                    payload: deviceCode,
                });*/
        dispatch({
            type: GET_DEVICE_BY_DEVICECODE,
            payload: res.data,
            comment: comments.data,
        });
    } catch (error) {
        /*        dispatch({
                    type: SET_DEVICE_DEVICECODE,
                    payload: undefined,
                });*/
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
        console.log(" ( ✘_✘ )↯ getDeviceCommentByDeviceCode 시작!");
        //API_ROUTE/device/comments/${deviceCode}/${type}
        const comments = await axios.get(`${API_ROUTE}/comments/${assetState.deviceByDeviceCode}`);
        dispatch({
            type: GET_COMMENTS_BY_DEVICECODE,
        });
    } catch (error) {
        dispatch({
            type: GET_COMMENTS_BY_DEVICECODE,
            payload: undefined,
        });
        console.log(" getDeviceCommentByDeviceCode error : ", error);
    }
};

// 장비 댓글 cud
export const submitDeviceComment = (division, assetState, jsonSubmitData) => async (dispatch) => {
    try {
        console.log(" ( ✘_✘ )↯ submitDeviceComment 시작!");
        console.log("jsonSubmitData : ", jsonSubmitData);

        /*        const res = await axios.get(
                    `${API_ROUTE}/device/comment/${division}/${jsonSubmitData}`,
                );*/

        axios.put(`${API_ROUTE}/comment/test`, {
            username: 'aaaaa',
            contents: 'react is good~!',
        })
            .then((response) => {
                console.log("response : ", response);
                dispatch({
                    type: GET_COMMENTS_BY_DEVICECODE,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log('error : ', error.response);
            });

        /*        dispatch({
                    type: GET_COMMENTS_BY_DEVICECODE,
                    payload: res.data,
                });*/
    } catch (error) {
        dispatch({
            type: GET_COMMENTS_BY_DEVICECODE,
            payload: undefined,
        });
        console.log("error : ", error);
    }
};

// 장비 반입/반출 update
export const submitDeviceOutFlag = (assetState, outFlag) => async (dispatch) => {
    try {
        console.log(" ◥◣‸◢◤ submitDeviceOutFlag 시작!");
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
