import axios from 'axios';
import API_ROUTE from "../../shared/apiRoute";

export const GET_DEVICES = 'GET_DEVICES';

export const fetchPosts = () => async (dispatch) => {
        //dispatch({type: GET_DEVICES});
        try {
            const res = await axios.get(`${API_ROUTE}/devices/server/0/list`);
            /*console.log("redux action res.data: ", res.data);
            console.log("redux action res.data.response: ", res.data.response);*/
            // dispatch 하기 전에 Immutable 사용 오류 5/6일부터 여기서부터 작업하면 됩니다.
            dispatch({type: GET_DEVICES, payload: res.data});
        } catch (error) {
            dispatch({type: GET_DEVICES, payload: undefined});
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
