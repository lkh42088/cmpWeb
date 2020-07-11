import { createAction } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const CHANGE_ACCOUNT_FIELD = 'account/CHANGE_ACCOUNT_FIELD';
export const CHANGE_LOGIN_PAGE = 'account/CHANGE_LOGIN_PAGE';
export const INITIALIZE_FORM = 'account/INITIALIZE_FORM';

export const [CHECK_USER, CHECK_USER_SUCCESS, CHECK_USER_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);
export const LOGOUT = 'user/LOGOUT';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const changeLoginField = createAction(CHANGE_ACCOUNT_FIELD, ({ key, value }) => ({ key, value }));
export const changeLoginPage = createAction(CHANGE_LOGIN_PAGE, ({ value }) => ({ value }));
export const initLoginForm = createAction(INITIALIZE_FORM);

export const checkLoginUser = createAction(CHECK_USER);
export const logout = createAction(LOGOUT);

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const checkSaga = createRequestSaga(CHECK_USER, authAPI.check);
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
    yield takeLatest(CHECK_USER, checkSaga);
    yield takeLatest(CHECK_USER_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
