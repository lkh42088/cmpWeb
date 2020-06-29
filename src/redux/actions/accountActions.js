import { createAction } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const CHANGE_ACCOUNT_FIELD = 'account/CHANGE_ACCOUNT_FIELD';
export const INITIALIZE_FORM = 'account/INITIALIZE_FORM';
export const LOGIN_SENT_EMAIL = 'account/LOGIN_SENT_EMAIL';
export const LOGIN_INPUT_EMAIL = 'account/LOGIN_INPUT_EMAIL';
export const LOGIN_EMAIL_SENT_EMAIL = 'account/LOGIN_EMAIL_SENT_EMAIL';
export const LOGIN_EMAIL_INPUT_EMAIL = 'account/LOGIN_EMAIL_INPUT_EMAIL';

/** SAGA Action Type */
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('account/REGISTER');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('account/LOGIN');
export const [LOGIN_EMAIL, LOGIN_EMAIL_SUCCESS, LOGIN_EMAIL_FAILURE] = createRequestActionTypes('account/LOGIN_EMAIL');
export const [LOGIN_CONFIRM, LOGIN_CONFIRM_SUCCESS, LOGIN_CONFIRM_FAILURE] = createRequestActionTypes('account/LOGIN_CONFIRM');

/** Account */
export const SET_LOGIN_USER = 'user/TEMP_SET_USER';
export const [CHECK_LOGIN_USER, CHECK_LOGIN_USER_SUCCESS, CHECK_LOGIN_USER_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);
export const LOGOUT = 'user/LOGOUT';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const changeField = createAction(CHANGE_ACCOUNT_FIELD, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

/** SAGA Action Function */
export const login = createAction(LOGIN, ({ username, password }) => ({ username, password }));
export const loginEmail = createAction(LOGIN_EMAIL, ({ username, password, email }) => ({ username, password, email }));
export const loginConfirm = createAction(LOGIN_CONFIRM, ({ username, password, email }) => ({ username, password, email }));
export const register = createAction(REGISTER, ({
    name, email, username, password,
}) => ({
    name, email, username, password,
}));

/** Account */
export const setLoginUser = createAction(SET_LOGIN_USER, user => user);
export const checkLoginUser = createAction(CHECK_LOGIN_USER);
export const logout = createAction(LOGOUT);

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const loginEmailSaga = createRequestSaga(LOGIN_EMAIL, authAPI.loginEmail);
const loginConfirmSaga = createRequestSaga(LOGIN_CONFIRM, authAPI.loginConfirm);

/** Account */
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
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGIN_EMAIL, loginEmailSaga);
    yield takeLatest(LOGIN_CONFIRM, loginConfirmSaga);
    /** Account */
    yield takeLatest(CHECK_LOGIN_USER, checkSaga);
    yield takeLatest(CHECK_LOGIN_USER_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
