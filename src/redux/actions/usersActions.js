import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as users from "../../lib/api/users";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const INITIALIZE_REGISTER_USER = 'user/INITIALIZE';
export const CHANGE_FIELD = 'user/CHANGE_FIELD';
export const ADD_EMAIL_GROUP = 'user/ADD_EMAIL_GROUP';
export const DELETE_EMAIL_GROUP = 'user/ADD_EMAIL_GROUP';
export const CHANGE_EMAIL_AUTH_FLAG = 'user/CHANGE_EMAIL_AUTH_FLAG';
export const CHANGE_EMAIL_AUTH_GROUP_FLAG = 'user/CHANGE_EMAIL_AUTH_GROUP_FLAG';
export const USER_BASE_INFO_BY_COMPANY = 'user/USER_BASE_INFO_BY_COMPANY';
export const CHECK_USER_REGISTER_FIELD = 'user/CHECK_USER_REGISTER_FIELD';

/** SAGA Action Type */
export const [CHECK_DUP_USER, CHECK_DUP_USER_SUCCESS, CHECK_DUP_USER_FAILURE] = createRequestActionTypes('user/CHECK_DUP_USER');
export const [REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE] = createRequestActionTypes('user/REGUSER');
export const [GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE] = createRequestActionTypes('user/USERLIST');

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const initRegisterUser = createAction(INITIALIZE_REGISTER_USER);
export const checkUserRegisterField = createAction(CHECK_USER_REGISTER_FIELD);
export const changeUserField = createAction(
    CHANGE_FIELD,
    ({ key, value }) => ({ key, value }),
);
export const addEmailGroup = createAction(
    ADD_EMAIL_GROUP,
    emailAuthGroupList => emailAuthGroupList,
);
export const deleteEmailGroup = createAction(
    DELETE_EMAIL_GROUP,
    emailAuthGroupList => emailAuthGroupList,
);
export const changeEmailAuthFlag = createAction(CHANGE_EMAIL_AUTH_FLAG);
export const changeEmailAuthGroupFlag = createAction(CHANGE_EMAIL_AUTH_GROUP_FLAG);
export const setupUserBaseByCompany = createAction(USER_BASE_INFO_BY_COMPANY, ({
    cpName, username, email, cellPhone,
}) => ({
    cpName, username, email, cellPhone,
}));

/** SAGA Action Function */
export const registerUser = createAction(REGISTER_USER, ({
    cpIdx, cpName, userId, password, username, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => ({
    cpIdx, cpName, id: userId, password, name: username, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}));
export const getUserList = createAction(GET_USER_LIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));
export const checkDupUser = createAction(CHECK_DUP_USER, ({ userId }) => ({ userId }));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const registerUserSaga = createRequestSaga(REGISTER_USER, users.registerUser);
const getUserListSaga = createRequestSaga(GET_USER_LIST, users.getUserList);
const checkDupUserSaga = createRequestSaga(CHECK_DUP_USER, users.checkDupUser);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* usersSaga() {
    yield takeLatest(REGISTER_USER, registerUserSaga);
    yield takeLatest(GET_USER_LIST, getUserListSaga);
    yield takeLatest(CHECK_DUP_USER, checkDupUserSaga);
}
