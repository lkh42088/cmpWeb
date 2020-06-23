import { createAction } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const CHANGE_FIELD = 'auth/CHANGE_FIELD';
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
export const LOGIN_SENT_EMAIL = 'auth/LOGIN_SENT_EMAIL';
export const LOGIN_INPUT_EMAIL = 'auth/LOGIN_INPUT_EMAIL';
export const LOGIN_EMAIL_SENT_EMAIL = 'auth/LOGIN_EMAIL_SENT_EMAIL';
export const LOGIN_EMAIL_INPUT_EMAIL = 'auth/LOGIN_EMAIL_INPUT_EMAIL';

/** SAGA Action Type */
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
export const [LOGIN_EMAIL, LOGIN_EMAIL_SUCCESS, LOGIN_EMAIL_FAILURE] = createRequestActionTypes('auth/LOGIN_EMAIL');
export const [LOGIN_CONFIRM, LOGIN_CONFIRM_SUCCESS, LOGIN_CONFIRM_FAILURE] = createRequestActionTypes('auth/LOGIN_CONFIRM');

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({ form, key, value }));
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

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const loginEmailSaga = createRequestSaga(LOGIN_EMAIL, authAPI.loginEmail);
const loginConfirmSaga = createRequestSaga(LOGIN_CONFIRM, authAPI.loginConfirm);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGIN_EMAIL, loginEmailSaga);
    yield takeLatest(LOGIN_CONFIRM, loginConfirmSaga);
}
