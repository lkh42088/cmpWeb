// 초기 상태 정의
import {List, Map} from "immutable";
import {
    GET_DEVICE_BY_DEVICECODE,
    GET_DEVICES, GET_DEVICES_SEARCH,
    GET_CODES,
    GET_SUBCODES,
    GET_COMPANIES,
    SET_DEVICE_DEVICECODE,
    SET_COMMENT,

    GET_COMMENTS_BY_DEVICECODE,
    GET_DEVICES_CHECKCOUNT, SET_STATUS,
    GET_DEVICE_ORI_BY_DEVICECODE,

    SET_ADD_ELE_IP_DATA, SET_ADD_ELE_SPLA_DATA,
    SET_DEVICE_SELECTED, SET_DEVICE_OUTFLAG, SET_DEVICE_TYPE,
    SET_DEVICE_SEARCH, SET_DEVICE_OUTFLAG_OPERATING, SET_DEVICE_OUTFLAG_CARRYING,
    SET_API_PAGE, SET_ASSETS_PAGE, SET_DEVICE_LOG,
} from "../actions/assetsAction";

export const initialState = {
    deviceType: 'server',
    deviceByDeviceCode: '',
    assetsPage: 'list',
    /*viewModalDivison: 'read',*/
    deviceOutFlag: '0',
    device: {},
    deviceOri: {},
    deviceIp: {},
    deviceSpla: {},
    deviceSelected: {},
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
        page: '1',
        count: '',
        curPage: '',
        deviceType: '',
        direction: '',
        orderKey: '',
        outFlag: '',
        size: '',
        totalPage: '',
    },
    apiPageRd: {
        deviceType: 'server',
        orderBy: 'DeviceCode',
        order: '1',
        rowsPerPage: 10,
        page: 0,
        showPage: 1,
        outFlag: '0',
        offsetPage: 0,
    },
    stateVal: {
        page: '',
        type: '',
        division: '',
        state: '',
    },
    searchRd: {
        customer: '',
        deviceCode: '',
        deviceType: '',
        idc: '',
        manufacture: '',
        outFlag: '',
        ownership: '',
        ownershipDiv: '',
        operatingFlag: true,
        carryingFlag: true,
    },
    operatingFlag: true,
    carryingFlag: true,
    deviceLog: {
        deviceCode: '',
        field: '',
        idx: '',
        logLevel: '',
        newStatus: '',
        oldStatus: '',
        registerDate: '',
        registerId: '',
        registerName: '',
        workCode: '',
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
        payload, type, deviceType, page, comment, division, log,
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
            };
        case GET_DEVICE_ORI_BY_DEVICECODE:
            return {
                ...state,
                deviceOri: payload,
            };
        case SET_DEVICE_DEVICECODE:
            return {
                ...state,
                deviceByDeviceCode: payload,
            };
        /*case GET_COMMENTS_BY_DEVICECODE:
            return {
                ...state,
                comments: payload,
            };*/
        case GET_DEVICES_CHECKCOUNT:
            return {
                ...state,
                devices: payload.Devices,
                page: payload.Page,
                deviceType,
            };
        case SET_STATUS:
            return {
                ...state,
                stateVal: payload,
            };
        /*case SET_MODAL_DIVISION:
            return {
                ...state,
                viewModalDivison: payload,
            };*/
        case SET_ADD_ELE_IP_DATA:
            return {
                ...state,
                deviceIp: payload,
            };
        case SET_ADD_ELE_SPLA_DATA:
            return {
                ...state,
                deviceSpla: payload,
            };
        case SET_DEVICE_SELECTED:
            return {
                ...state,
                deviceSelected: payload,
            };
        case SET_DEVICE_TYPE:
            return {
                ...state,
                deviceType: payload,
            };
        case GET_DEVICES_SEARCH:
            return {
                ...state,
                devices: payload,
            };
        case SET_DEVICE_SEARCH:
            return {
                ...state,
                searchRd: payload,
            };
        case SET_API_PAGE:
            return {
                ...state,
                apiPageRd: payload,
            };
        case SET_ASSETS_PAGE:
            return {
                ...state,
                assetsPage: payload,
            };
        case SET_DEVICE_LOG:
            return {
              ...state,
                deviceLog: payload,
            };
        case SET_COMMENT:
            return {
                ...state,
                comments: payload,
            };
        /*case SET_DEVICE_OUTFLAG_OPERATING:
            return {
                ...state,
                operatingFlag: payload,
            };
        case SET_DEVICE_OUTFLAG_CARRYING:
            return {
                ...state,
                carryingFlag: payload,
            };*/
        /*case SET_DEVICE_OUTFLAG:
            return {
                ...state,
                deviceOutFlag: payload,
            };*/
        default:
            return state;
    }
};
export default assetsReducer;
