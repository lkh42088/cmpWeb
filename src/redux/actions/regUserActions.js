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

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const initialize = createAction(INITIALIZE);
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

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const registerUserSaga = createRequestSaga(REGUSER, users.registerUser);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* regUserSaga() {
    yield takeLatest(REGUSER, registerUserSaga);
}
