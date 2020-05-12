import axios from 'axios';
import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICE_BY_IDX = 'GET_DEVICE_BY_IDX';
export const SET_DEVICE_IDX = 'SET_DEVICE_IDX';

//const API_ROUTE = 'http://127.0.0.1:8081/v1';
export const fetchPosts = val => async (dispatch) => {
    try {
        //router.GET("/v1/devices/:type/:outFlag/list", h.GetDevicesByList)
        const res = await axios.get(`${API_ROUTE}/devices/${val}/0/list`);
        //router.GET("/v1/page/:type/:outFlag/:size/:page/:order/:dir", h.GetDevicesForPage)
        //const page = await axios.get(`${API_ROUTE}/page/${val}/0/10/1/Idx/0`);
        //console.log("★ page : ", page);

        dispatch({type: GET_DEVICES, payload: res.data, deviceType: val});
    } catch (error) {
        dispatch({type: GET_DEVICES, payload: undefined, deviceType: 'server'});
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
        console.log("res....", res.data);
        console.log("deviceType.... : ", deviceType, ", idx : ", idx);

        dispatch({type: SET_DEVICE_IDX, payload: idx});
        dispatch({type: GET_DEVICE_BY_IDX, payload: res.data});
    } catch (error) {
        dispatch({type: SET_DEVICE_IDX, payload: undefined});
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
