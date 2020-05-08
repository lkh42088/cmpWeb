import axios from 'axios';
import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICE_BY_IDX = 'GET_DEVICE_BY_IDX';
export const SET_DEVICE_IDX = 'SET_DEVICE_IDX';

export const fetchPosts = val => async (dispatch) => {
    try {
        //router.GET("/v1/devices/:type/:outFlag/list", h.GetDevicesByList)
        const res = await axios.get(`${API_ROUTE}/devices/${val}/0/list`);

        dispatch({type: GET_DEVICES, payload: res.data, devicetype: val});
    } catch (error) {
        dispatch({type: GET_DEVICES, payload: undefined, devicetype: 'server'});
        console.log("error : ", error);
    }
};

export const setDeviceIdx = val => async (dispatch) => {
    try {
        dispatch({type: SET_DEVICE_IDX, payload: val});
    } catch (error) {
        dispatch({type: SET_DEVICE_IDX, payload: undefined});
        console.log("error : ", error);
    }
};

export const getDeviceByIdx = (idx, deviceType) => async (dispatch) => {
    try {
        //router.GET("/v1/device/:type/:idx", h.GetDevicesByIdx)
        const res = await axios.get(`${API_ROUTE}/device/${deviceType}/${idx}`);

        dispatch({type: GET_DEVICE_BY_IDX, payload: res.data});
    } catch (error) {
        dispatch({type: GET_DEVICE_BY_IDX, payload: undefined});
        console.log("error : ", error);
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
