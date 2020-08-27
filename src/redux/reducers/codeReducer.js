import produce from "immer";
import {List, Map} from "immutable";
import {handleActions} from 'redux-actions';
import {
    SET_MAIN_SUBCODE_DISPLAY_FLAG, SET_MAIN_SUBCODE_SELECTED, SET_MAIN_TAB_SELECTED,
    SET_MENU_MENUCODE, SET_MENU_SELECTED,
    GET_CODE_MENU_TAG_SUCCESS, GET_CODE_MENU_TAG_FAILURE,
    GET_MAIN_CODE_SUCCESS, GET_MAIN_CODE_FAILURE,
    GET_MAIN_CODE_BY_TYPE_SUCCESS, GET_MAIN_CODE_BY_TYPE_FAILURE,
    GET_SUB_CODE_BY_IDX_SUCCESS, GET_SUB_CODE_BY_IDX_FAILURE,
    SET_ED_MAIN_CODE, SET_ED_SUB_CODE,
    SET_ED_DIVISION,
} from "../actions/codeActions";

const initialState = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0, // total count
        rows: 0,
        offset: 0,
    },
    msg: null,
    msgError: null,
    userPage: 'list',
    userIdx: '',
    user: {},
    /*--------------------------------------------------------------------------*/
    code: {},
    mainCode: List([
        Map({}),
    ]),
    subCode: List([
        Map({}),
    ]),
    mainCodeTag: List([
        Map({}),
    ]),
    mainSubCodeDisplayFlag: false, /*IDC 등 서브코드 확인시 flag*/
    mainSubCodeSelected: '', /*maincode table에서 서브코드 확인 시 고유값 넘기기 -> 필요없을거 같음*/
    menuCode: {},

    menuSelected: 'idc_cd', /*menucode selected*/
    mainTabSelected: 'total', /*main tab selected*/

    edMainCode: {},
    edSubCode: {},

    edDivision: {
        division: 'add', /*add, edit*/
        codeType: 'main', /*main, sub*/
    },
};

const codeReducer = handleActions(
    {
        [SET_MENU_SELECTED]: (state, {payload}) => ({
            ...state,
            menuSelected: payload,
        }),
        [SET_MAIN_TAB_SELECTED]: (state, {payload}) => ({
            ...state,
            mainTabSelected: payload,
        }),
        [SET_MENU_MENUCODE]: (state, {payload}) => ({
            ...state,
            menuCode: payload,
        }),
        [SET_MAIN_SUBCODE_DISPLAY_FLAG]: (state, {payload}) => ({
            ...state,
            mainSubCodeDisplayFlag: payload,
        }),
        [SET_MAIN_SUBCODE_SELECTED]: (state, {payload}) => ({
            ...state,
            mainSubCodeSelected: payload,
        }),
        [GET_MAIN_CODE_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            mainCode: msg,
        }),
        [GET_MAIN_CODE_BY_TYPE_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            mainCode: msg,
        }),
        [GET_CODE_MENU_TAG_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            mainCodeTag: msg,
        }),
        [GET_SUB_CODE_BY_IDX_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            subCode: msg,
        }),
        [SET_ED_MAIN_CODE]: (state, {payload}) => ({
            ...state,
            edMainCode: payload,
        }),
        [SET_ED_SUB_CODE]: (state, {payload}) => ({
            ...state,
            edSubCode: payload,
        }),
        [SET_ED_DIVISION]: (state, {payload}) => ({
            ...state,
            edDivision: payload,
        }),
    },
    initialState,
);

export default codeReducer;
