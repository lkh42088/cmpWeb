import { createAction } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';

// Action 정의
export const CHANGE_FIELD = 'auth/CHANGE_FIELD';
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER',
);

export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN',
);

export const [LOGIN_EMAIL, LOGIN_EMAIL_SUCCESS, LOGIN_EMAIL_FAILURE] = createRequestActionTypes(
    'auth/LOGIN_EMAIL',
);

export const [LOGIN_CONFIRM, LOGIN_CONFIRM_SUCCESS, LOGIN_CONFIRM_FAILURE] = createRequestActionTypes(
    'auth/LOGIN_CONFIRM',
);

export const LOGIN_SENT_EMAIL = 'auth/LOGIN_SENT_EMAIL';
export const LOGIN_INPUT_EMAIL = 'auth/LOGIN_INPUT_EMAIL';
export const LOGIN_EMAIL_SENT_EMAIL = 'auth/LOGIN_EMAIL_SENT_EMAIL';
export const LOGIN_EMAIL_INPUT_EMAIL = 'auth/LOGIN_EMAIL_INPUT_EMAIL';

// Action 생성 함수
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register, login
        key, // username, password, passwordConfirm
        value, // 실제 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register, login

export const register = createAction(REGISTER, ({
    name, email, username, password,
}) => ({
    name, email, username, password,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
    username,
    password,
}));

export const loginEmail = createAction(LOGIN_EMAIL, ({ username, password, email }) => ({
    username,
    password,
    email,
}));

export const loginConfirm = createAction(LOGIN_CONFIRM, ({ username, password, email }) => ({
    username,
    password,
    email,
}));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const loginEmailSaga = createRequestSaga(LOGIN_EMAIL, authAPI.loginEmail);
const loginConfirmSaga = createRequestSaga(LOGIN_CONFIRM, authAPI.loginConfirm);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGIN_EMAIL, loginEmailSaga);
    yield takeLatest(LOGIN_CONFIRM, loginConfirmSaga);
}
