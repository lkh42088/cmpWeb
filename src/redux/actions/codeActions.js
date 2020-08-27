import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as code from "../../lib/api/code";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const SET_MENU_SELECTED = 'code/SET_MENU_SELECTED';
export const SET_MENU_MENUCODE = 'code/SET_MENU_MENUCODE';

export const SET_MAIN_SUBCODE_DISPLAY_FLAG = 'code/SET_MAIN_SUBCODE_DISPLAY_FLAG';
export const SET_MAIN_SUBCODE_SELECTED = 'code/SET_MAIN_SUBCODE_SELECTED';
export const SET_MAIN_TAB_SELECTED = 'code/SET_MAIN_TAB_SELECTED';

export const SET_ED_MAIN_CODE = 'code/SET_ED_MAIN_CODE';
export const SET_ED_SUB_CODE = 'code/SET_ED_SUB_CODE';
export const SET_ED_DIVISION = 'code/SET_ED_DIVISION';

/*--------------------------------------------------------------------------*/
/** SAGA Action Type */
export const [GET_CODE_MENU_TAG, GET_CODE_MENU_TAG_SUCCESS, GET_CODE_MENU_TAG_FAILURE] = createRequestActionTypes('code/CODELIST');
export const [GET_MAIN_CODE, GET_MAIN_CODE_SUCCESS, GET_MAIN_CODE_FAILURE] = createRequestActionTypes('code/MAINCODELIST');
export const [GET_MAIN_CODE_BY_TYPE, GET_MAIN_CODE_BY_TYPE_SUCCESS, GET_MAIN_CODE_BY_TYPE_FAILURE] = createRequestActionTypes('code/MAINCODELISTBYTYPE');
export const [GET_SUB_CODE_BY_IDX, GET_SUB_CODE_BY_IDX_SUCCESS, GET_SUB_CODE_BY_IDX_FAILURE] = createRequestActionTypes('code/SUBCODELISTBYIDX');


/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const setMainSubCodeDisplayFlag = createAction(SET_MAIN_SUBCODE_DISPLAY_FLAG, mainSubCodeDisplayFlag => mainSubCodeDisplayFlag);
export const setMainSubCodeSelected = createAction(SET_MAIN_SUBCODE_SELECTED, mainSubCodeSelected => mainSubCodeSelected);
export const setMainTabSelected = createAction(SET_MAIN_TAB_SELECTED, idx => idx);

export const setMenuSelected = createAction(SET_MENU_SELECTED, idx => idx);

export const setEdMainCode = createAction(SET_ED_MAIN_CODE, mainCode => mainCode);
export const setEdSubCode = createAction(SET_ED_SUB_CODE, subCode => subCode);
export const setEdDivision = createAction(SET_ED_DIVISION, division => division);

/** SAGA Action Function */
export const getCodes = createAction(SET_MENU_MENUCODE);
export const getCodesTag = createAction(GET_CODE_MENU_TAG);
export const getMainCodeByType = createAction(GET_MAIN_CODE_BY_TYPE, ({ type, subType }) => ({ type, subType }));
export const getSubCodeByIdx = createAction(GET_SUB_CODE_BY_IDX, ({ type, subType, idx }) => ({ type, subType, idx }));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getCodesSaga = createRequestSaga(SET_MENU_MENUCODE, code.getCodes);
const getCodesTagSaga = createRequestSaga(GET_CODE_MENU_TAG, code.getCodesTag);
const getMainCodeByTypeSaga = createRequestSaga(GET_MAIN_CODE_BY_TYPE, code.getMainCodeByType);
const getSubCodeByIdxSaga = createRequestSaga(GET_SUB_CODE_BY_IDX, code.getSubCodeByIdx);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* codeSaga() {
    yield takeLatest(SET_MENU_MENUCODE, getCodesSaga);
    yield takeLatest(GET_CODE_MENU_TAG, getCodesTagSaga);
    yield takeLatest(GET_MAIN_CODE_BY_TYPE, getMainCodeByTypeSaga);
    yield takeLatest(GET_SUB_CODE_BY_IDX, getSubCodeByIdxSaga);
}
