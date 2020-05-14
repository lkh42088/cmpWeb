// 초기 상태 정의
import {List, Map} from "immutable";
import {
    GET_DEVICE_BY_DEVICECODE,
    GET_DEVICES,
    SET_DEVICE_DEVICECODE,
    SET_COMMENT,
    GET_COMMENTS_BY_DEVICECODE,
    GET_DEVICES_CHECKCOUNT,
} from "../actions/assetsAction";

export const initialState = {
    deviceType: 'server',
    deviceByDeviceCode: '1',
    device: {},
    devices: List([
        Map({ // 굳이 작성하지 않아도 상관없음 편리하게 불변함 유지
            Idx: '0',
            DeviceCode: '',
            OutFlag: '',
            Num: '',
            CommentCnt: '',
            CommentLastDate: '',
            Option: '',
            Hit: '',
            RegisterId: '',
            Password: '',
            RegisterName: '',
            RegisterEmail: '',
            RegisterDate: '',
            Model: '',
            Contents: '',
            Customer: '',
            Manufacture: '',
            DeviceType: '',
            WarehousingDate: '',
            RentDate: '',
            Ownership: '',
            OwnerCompany: '',
            HwSn: '',
            IDC: '',
            Rack: '',
            Cost: '',
            Purpos: '',
            Ip: '',
            Size: '',
            Spla: '',
            Cpu: '',
            Memory: '',
            Hdd: '',
            FirmwareVersion: '',
            Warranty: '',
            MonitoringFlag: '',
            MonitoringMethod: '',
        }),
    ]),
    comments: List([
        Map({
            Idx: '',
            parentTable: '',
            fkIdx: '',
            dvcDepth: '',
            dvcContents: '',
            registerId: '',
            registerName: '',
            registerDate: '',
        }),
    ]),
    page: {
        Count: '',
        CurPage: '',
        DeviceType: '',
        Direction: '',
        OrderKey: '',
        OutFlag: '',
        Size: '',
        TotalPage: '',
    },
    frontPage: {
        oriPage: 0,
        showPage: 1,
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
        payload, type, deviceType, page,
    } = action;
    //const devices = state.get('devices');
    switch (type) {
        case 'ADD_ASSETS':
            return Object.assign({}, state, {
                assets: [{
                    equCode: action.equCode,
                    division: action.division,
                    manufacturer: action.manufacturer,
                    model: action.model,
                    ip: action.ip,
                    ownership: action.ownership,
                    ownershipDivision: action.ownershipDivision,
                    customer: action.customer,
                    idc: action.idc,
                    size: action.size,
                    usage: action.usage,
                    id: getId(state),
                }, ...state.assets],
            }); // ... 은 자바스크립트의 전개연산자, 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다는 의미
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
        case GET_DEVICE_BY_DEVICECODE:
            return {
                ...state,
                device: payload,
            };
        case SET_DEVICE_DEVICECODE:
            return {
                ...state,
                deviceByDeviceCode: payload,
            };
        case GET_COMMENTS_BY_DEVICECODE:
            return {
                ...state,
                comments: payload,
            };
        case GET_DEVICES_CHECKCOUNT:
/*            console.log("♡♡♡♡ state.devices", state.devices);
            console.log("♡♡♡♡ payload.Devices", payload.Devices);*/
            // var newList = list.push(Map({value: 3}))
            // eslint-disable-next-line no-case-declarations
            //const newList = state.devices.push();
            //state.devices.push(payload.Devices); -> 1001
            //state.devices.push([payload.Devices]); -> 1001
            //state.devices.push(Map[payload.Devices]); -> 1001
            //state.devices.push(Map[Map({devices: payload.Devices})]); -> 1001

            //state.devices.update(payload.Devices);
            return {
                ...state,
                devices: payload.Devices,
                page: payload.Page,
                deviceType,
            };
        /*
                    return state.set('counters', counters.push(Map({
                        color: action.color,
                        number: 0
                    })))*/
        default:
            return state;
    }
};
export default assetsReducer;
