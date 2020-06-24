import { createAction } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const SET_LOGIN_USER = 'user/TEMP_SET_USER';

export const [CHECK_LOGIN_USER, CHECK_LOGIN_USER_SUCCESS, CHECK_LOGIN_USER_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);

export const LOGOUT = 'user/LOGOUT';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const setLoginUser = createAction(SET_LOGIN_USER, user => user);
export const checkLoginUser = createAction(CHECK_LOGIN_USER);
export const logout = createAction(LOGOUT);

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const checkSaga = createRequestSaga(CHECK_LOGIN_USER, authAPI.check);

function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    } catch (e) {
        console.log(e);
    }
}

function checkFailureSaga() {
    try {
        localStorage.removeItem('user');
    } catch (e) {
        console.log('localStorage is not working');
    }
}

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* userSaga() {
    yield takeLatest(CHECK_LOGIN_USER, checkSaga);
    yield takeLatest(CHECK_LOGIN_USER_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
