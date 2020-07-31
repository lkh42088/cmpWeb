import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as users from "../../lib/api/users";
import {PAGING_CHANGE_DENSE} from "./pagingActions";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const INITIALIZE_REGISTER_USER = 'user/INITIALIZE';
export const CHANGE_USER_REGISTER_FIELD = 'user/CHANGE_USER_REGISTER_FIELD';
export const CHANGE_USER_FIELD = 'user/CHANGE_USER_FIELD';
export const CHECK_USER_REGISTER_FIELD = 'user/CHECK_USER_REGISTER_FIELD';

export const SET_USER_PAGE = 'user/SET_USER_PAGE';
export const SET_USER_IDX = 'user/SET_USER_IDX';
export const SET_USER = 'user/SET_USER';

/** SAGA Action Type */
export const [CHECK_DUP_USER, CHECK_DUP_USER_SUCCESS, CHECK_DUP_USER_FAILURE] = createRequestActionTypes('user/CHECK_DUP_USER');
export const [GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE] = createRequestActionTypes('user/USERLIST');
export const [
    GET_USER_LIST_WITH_SEARCH_PARAM,
    GET_USER_LIST_WITH_SEARCH_PARAM_SUCCESS,
    GET_USER_LIST_WITH_SEARCH_PARAM_FAILURE,
] = createRequestActionTypes('user/USERLIST_WITH_SEARCH_PARAM');
export const [SET_USER_BY_ID] = createRequestActionTypes('user/SET_USER_BY_ID');

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const initRegisterUser = createAction(INITIALIZE_REGISTER_USER);
export const checkUserRegisterField = createAction(CHECK_USER_REGISTER_FIELD);
export const changeUserRegisterField = createAction(
    CHANGE_USER_REGISTER_FIELD,
    ({ key, value }) => ({ key, value }),
);

export const setUserPage = createAction(SET_USER_PAGE,
    userPage => userPage);
export const setUserIdx = createAction(SET_USER_IDX, userIdx => userIdx);
export const setUser = createAction(SET_USER, data => data);


/** SAGA Action Function */
export const getUserList = createAction(GET_USER_LIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));

export const getUserListWithSearchParam = createAction(GET_USER_LIST_WITH_SEARCH_PARAM, ({
    rows, offset, orderBy, order, searchParam,
}) => ({
    rows, offset, orderBy, order, searchParam,
}));

export const checkDupUser = createAction(CHECK_DUP_USER, ({ userId }) => ({ userId }));

export const getUserById = createAction(SET_USER_BY_ID, ({ id }) => ({ id }));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getUserListSaga = createRequestSaga(GET_USER_LIST, users.getUserList);
const getUserListWithSearchParamSaga = createRequestSaga(GET_USER_LIST_WITH_SEARCH_PARAM,
    users.getUserListWithSearchParam);
const checkDupUserSaga = createRequestSaga(CHECK_DUP_USER, users.checkDuplicateUser);
const getUserByIdSaga = createRequestSaga(SET_USER_BY_ID, users.getUserById);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* usersSaga() {
    yield takeLatest(GET_USER_LIST, getUserListSaga);
    yield takeLatest(GET_USER_LIST_WITH_SEARCH_PARAM, getUserListWithSearchParamSaga);
    yield takeLatest(CHECK_DUP_USER, checkDupUserSaga);
    yield takeLatest(SET_USER_BY_ID, getUserByIdSaga);
}
