// 초기 상태 정의
import {List, Map} from "immutable";
import {
    GET_DEVICE_BY_DEVICECODE,
    GET_DEVICES,
    GET_CODES,
    GET_SUBCODES,
    GET_COMPANIES,
    SET_DEVICE_DEVICECODE,
    SET_COMMENT,
    GET_COMMENTS_BY_DEVICECODE,
    GET_DEVICES_CHECKCOUNT, SET_STATUS,
    GET_DEVICE_ORI_BY_DEVICECODE, SET_MODAL_DIVISION,
} from "../actions/assetsAction";

export const initialState = {
    deviceType: 'server',
    deviceByDeviceCode: '1',
    viewModalDivison: 'read',
    device: {},
    deviceIp: {},
    deviceOri: {},
    devices: List([
        Map({}),
    ]),
    comments: List([
        Map({}),
    ]),
    codes: List([
        Map({codeDeviceType: List([Map({})])}),
        Map({codeManufacture: List([Map({})])}),
        Map({codeOwnership: List([Map({})])}),
        Map({codeOwnershipDiv: List([Map({})])}),
        Map({codeIdc: List([Map({})])}),
        Map({codeSize: List([Map({})])}),
        Map({codeSpla: List([Map({})])}),
        Map({codeCustomer: List([Map({})])}),
        Map({codeRackCode: List([Map({})])}),
    ]),
    subCodes: List([
        Map({}),
    ]),
    company: List([
        Map({}),
    ]),
    page: {
        count: '',
        curPage: '',
        deviceType: '',
        direction: '',
        orderKey: '',
        outFlag: '',
        size: '',
        totalPage: '',
    },
    frontPage: {
        oriPage: 0,
        showPage: 1,
    },
    stateVal: {
        type: '',
        division: '',
        state: '',
    },
};

function getId(state) {
    return state.assets.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// state 가 undefined 일때 (store 가 생성될때) state 의 기본값을 initialState 로 사용
// action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환
// state 값을 직접 수정하면 안되고, 기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환
const assetsReducer = (state = initialState, action) => {
    const {
        payload, type, deviceType, page, comment,
    } = action;
    //const devices = state.get('devices');
    // ... 은 자바스크립트의 전개연산자, 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다는 의미
    switch (type) {
        case GET_CODES:
            return {
                ...state,
                codes: {
                    codeDeviceType: payload.DeviceType,
                    codeManufacture: payload.Manufacture,
                    codeOwnership: payload.Ownership,
                    codeOwnershipDiv: payload.OwnershipDiv,
                    codeIdc: payload.Idc,
                    codeSize: payload.Size,
                    codeSpla: payload.Spla,
                    codeCustomer: payload.Customer,
                    codeRackCode: payload.RackCode,
                },
            };
        case GET_SUBCODES:
            return {
                ...state,
                subCodes: payload,
            };
        case GET_DEVICES:
            return {
                ...state,
                devices: payload.Devices,
                page: payload.Page,
                front: {
                    oriPage: page,
                },
                deviceType,
            };
        case GET_COMPANIES:
            return {
                ...state,
                company: payload,
            };
        case GET_DEVICE_BY_DEVICECODE:
            return {
                ...state,
                device: payload,
                comments: comment,
            };
        case GET_DEVICE_ORI_BY_DEVICECODE:
            return {
                ...state,
                deviceOri: payload,
                deviceIp: page,
            };
        case SET_DEVICE_DEVICECODE:
            console.log("reducer : ", payload);
            return {
                ...state,
                deviceByDeviceCode: payload,
            };
        case GET_COMMENTS_BY_DEVICECODE:
            return {
                ...state,
                comments: comment,
            };
        case GET_DEVICES_CHECKCOUNT:
            return {
                ...state,
                devices: payload.Devices,
                page: payload.Page,
                front: {
                    oriPage: page,
                },
                deviceType,
            };
        case SET_STATUS:
            return {
                ...state,
                stateVal: payload,
            };
        case SET_MODAL_DIVISION:
            return {
                ...state,
                viewModalDivison: payload,
            };
        default:
            return state;
    }
};
export default assetsReducer;
