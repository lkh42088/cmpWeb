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
export const fetchPosts = (type, page, checkPageNumCount, orderBy, order) => async (dispatch) => {
    try {
        //router.GET("/v1/devices/:type/:outFlag/list", h.GetDevicesByList)
        //const res = await axios.get(`${API_ROUTE}/devices/${type}/0/list`);

        console.log(" ◥◣‸◢◤  fetchPosts 시작!");

        if (typeof page === 'undefined') {
            // eslint-disable-next-line no-param-reassign
            page = 0;
        }
        if (typeof checkPageNumCount === 'undefined') {
            // eslint-disable-next-line no-param-reassign
            checkPageNumCount = 10;
        }
        if (typeof orderBy === 'undefined') {
            // eslint-disable-next-line no-param-reassign
            orderBy = 'DeviceCode';
        }

        if (typeof order === 'undefined' || order === 'asc') {
            // eslint-disable-next-line no-param-reassign
            order = 1;
        } else if (order === 'desc') {
            // eslint-disable-next-line no-param-reassign
            order = 0;
        }

        console.log("API_ROUTE/page/", type, "/0/100/", checkPageNumCount, "/", orderBy, "/", order);
        const pageDevices = await axios.get(`${API_ROUTE}/page/${type}/0/100/${checkPageNumCount}/${orderBy}/${order}`);
        console.log("★ fetchPosts pageDevices : ", pageDevices.data);

        dispatch({
            type: GET_DEVICES,
            payload: pageDevices.data,
            deviceType: type,
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

export const fetchPostsCheckCount = (type, page, checkPageNumCount, orderBy, order, rowsPerPage, showPage) => async (dispatch) => {
    try {
        console.log(" ◥◣‸◢◤ fetchPostsCheckCount 시작!");

        if (typeof order === 'undefined' || order === 'asc') {
            // eslint-disable-next-line no-param-reassign
            order = 1;
        } else if (order === 'desc') {
            // eslint-disable-next-line no-param-reassign
            order = 0;
        }

        console.log("API_ROUTE/page/", type, "/0/100/", checkPageNumCount, "/", orderBy, "/", order);
        const pageDevices = await axios.get(`${API_ROUTE}/page/${type}/0/100/${checkPageNumCount}/${orderBy}/${order}`);
        console.log("★ fetchPostsCheckCount pageDevices : ", pageDevices.data);

        console.log(" fetchPostsCheckCount showPage : ", showPage);

        dispatch({
            type: GET_DEVICES_CHECKCOUNT,
            payload: pageDevices.data,
            deviceType: type,
            page: showPage + 1,
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
export const submitDeviceComment = (comment, assetState, division, loginId, commentIdx) => async (dispatch) => {
    try {
        console.log(" ( ✘_✘ )↯ submitDeviceComment 시작!");
        console.log("-> comment : ", comment, ", division : ", division);
        console.log("-> assetState : ", assetState);
        console.log("-> loginId : ", loginId);
        console.log("-> commentIdx : ", commentIdx);

        if (typeof commentIdx === 'undefined') {
            // eslint-disable-next-line no-param-reassign
            commentIdx = '';
        }

        //API_ROUTE/device/comment/create/${deviceCode}/${type}/${comment}/${userId}
        //GET_COMMENTS_BY_DEVICECODE
        let res;

        if (division === 'create') {
            console.log("comment create");
            // eslint-disable-next-line max-len
            res = await axios.get(
                `${API_ROUTE}/device/comment/create/
                ${assetState.deviceType}/${assetState.deviceByDeviceCode}/${comment}/${loginId}`,
            );
        } else if (division === 'update') {
            console.log("comment update");
            res = await axios.get(
                `${API_ROUTE}/device/comment/update/
                ${assetState.deviceType}/${assetState.deviceByDeviceCode}/${comment}/${loginId}/${commentIdx}`,
            );
        } else if (division === 'delete') {
            console.log("comment delete");
            res = await axios.get(
                `${API_ROUTE}/device/comment/delete/
                ${assetState.deviceType}/${assetState.deviceByDeviceCode}/${comment}/${loginId}/${commentIdx}`,
            );
        }
        dispatch({
            type: GET_COMMENTS_BY_DEVICECODE,
            payload: res.data,
        });
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
