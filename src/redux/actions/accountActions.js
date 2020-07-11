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
export const LOGIN_SENT_EMAIL = 'account/LOGIN_SENT_EMAIL';
export const LOGIN_INPUT_EMAIL = 'account/LOGIN_INPUT_EMAIL';
export const LOGIN_EMAIL_SENT_EMAIL = 'account/LOGIN_EMAIL_SENT_EMAIL';
export const LOGIN_EMAIL_INPUT_EMAIL = 'account/LOGIN_EMAIL_INPUT_EMAIL';

/** SAGA Action Type */
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('account/REGISTER');

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
export const changeLoginPage = createAction(CHANGE_LOGIN_PAGE, ({ value }) => ({ value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

/** SAGA Action Function */
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
    /** Account */
    yield takeLatest(CHECK_LOGIN_USER, checkSaga);
    yield takeLatest(CHECK_LOGIN_USER_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
