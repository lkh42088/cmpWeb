import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as users from "../../lib/api/users";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const INITIALIZE = 'user/INITIALIZE';
export const CHANGE_FIELD = 'user/CHANGE_FIELD';
export const ADD_EMAIL_GROUP = 'user/ADD_EMAIL_GROUP';
export const DELETE_EMAIL_GROUP = 'user/ADD_EMAIL_GROUP';
export const CHANGE_EMAIL_AUTH_FLAG = 'user/CHANGE_EMAIL_AUTH_FLAG';
export const CHANGE_EMAIL_AUTH_GROUP_FLAG = 'user/CHANGE_EMAIL_AUTH_GROUP_FLAG';
export const [REGUSER, REGUSER_SUCCESS, REGUSER_FAILURE] = createRequestActionTypes('user/REGUSER');

export const USER_BASE_INFO_BY_COMPANY = 'user/USER_BASE_INFO_BY_COMPANY';

export const [USERLIST, USERLIST_SUCCESS, USERLIST_FAILURE] = createRequestActionTypes(
    'user/USERLIST',
);

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const initializeUser = createAction(INITIALIZE);
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
export const registerUser = createAction(REGUSER, ({
    userId, password, username, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => ({
    id: userId, password, name: username, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}));

export const setupUserBaseByCompany = createAction(USER_BASE_INFO_BY_COMPANY, ({
    username, email, cellPhone,
}) => ({
    username, email, cellPhone,
}));

export const getUserList = createAction(USERLIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));
/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const registerUserSaga = createRequestSaga(REGUSER, users.registerUser);
const getUserListSaga = createRequestSaga(USERLIST, users.getUserList);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* usersSaga() {
    yield takeLatest(REGUSER, registerUserSaga);
    yield takeLatest(USERLIST, getUserListSaga);
}
