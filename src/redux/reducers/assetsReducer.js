// 초기 상태 정의
import {List, Map} from "immutable";
import {GET_DEVICE_BY_IDX, GET_DEVICES, SET_DEVICE_IDX} from "../actions/assetsAction";

export const initialState = {
    deviceType: 'server',
    deviceByIdx: '',
    /*device: Map({
        Idx: '0',
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
        DeviceCode: '',
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
    }),*/
    device: {
        Idx: '0',
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
        DeviceCode: '',
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
    },
    devices: List([
        Map({ // 굳이 작성하지 않아도 상관없음 편리하게 불변함 유지
            Idx: '0',
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
            DeviceCode: '',
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
};

function getId(state) {
    return state.assets.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}

// state 가 undefined 일때 (store 가 생성될때) state 의 기본값을 initialState 로 사용
// action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환
// state 값을 직접 수정하면 안되고, 기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환
const assetsReducer = (state = initialState, action) => {
    const {payload, type, devicetype} = action;
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
                devices: payload,
                deviceType: devicetype,
            };
        case SET_DEVICE_IDX:
            return {
                ...state,
                deviceByIdx: payload,
            };
        case GET_DEVICE_BY_IDX:
            return {
                ...state,
                device: payload,
            };
        default:
            return state;
    }
};
export default assetsReducer;
