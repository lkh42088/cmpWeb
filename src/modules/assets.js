// eslint-disable-next-line import/no-unresolved
import { createAction, handleActions } from 'redux-actions';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import { Map, List } from 'immutable';
import produce from 'immer';

// 액션 타입
const LIST_DEVICE = 'assets/LIST_DEVICE'; // 디바이스 목록을 가져옴
const TOGGLE_DEVICE = 'assets/TOGGLE_DEVICE'; // 체크/체크 해제함

// 액션 생성자
export const listDevice = createAction(LIST_DEVICE); // device, outFlag
export const toggleDevice = createAction(TOGGLE_DEVICE, id => id);

// 초기 상태를 정의합니다
const initialState = Map({
    assets: List([
        Map({
            idx: '',
            out_flag: '',
            num: '',
            comment_cnt: '',
            comment_last_date: '',
            option: '',
            hit: '',
            register_id: '',
            register_password: '',
            register_name: '',
            register_email: '',
            register_date: '',
            device_code: 'XCXC01',
            model_cd: '',
            contents: '',
            customer_cd: '',
            manufacture_cd: '',
            device_type_cd: '',
            warehousing_date: '',
            rent_date: '',
            ownership_cd: '',
            owner_company: '',
            hw_sn: '',
            idc_cd: '',
            rack_cd: '',
            cost: '',
            purpos: '',
            ip: '',
            size_cd: '',
            spla_cd: '',
            cpu: '',
            memory: '',
            hdd: '',
            firmware_version: '',
            warranty: '',
            mornitoring_flag: '',
            mornitoring_method: '',
        }),
    ]),
});

//switch 문 대신 사용하는 handleActions
export default handleActions({
    [LIST_DEVICE]: (state, action) => state,
    [TOGGLE_DEVICE]: (state, { payload: id }) => ({
       ...state,
       listes: state.listes.map(list =>
       list.id === id ? { ...list, done: !list.done } : list,
       ),
    }),
}, initialState);
