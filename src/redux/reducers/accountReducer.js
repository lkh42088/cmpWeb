import {handleActions} from "redux-actions";
import produce from "immer";
import {
    // eslint-disable-next-line import/named
    CHANGE_ACCOUNT_FIELD,
    INITIALIZE_FORM,
    LOGIN_CONFIRM_FAILURE,
    LOGIN_CONFIRM_SUCCESS,
    LOGIN_EMAIL_INPUT_EMAIL,
    LOGIN_EMAIL_SENT_EMAIL,
    LOGIN_FAILURE,
    LOGIN_INPUT_EMAIL,
    LOGIN_SENT_EMAIL,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SET_LOGIN_USER,
    CHECK_LOGIN_USER_SUCCESS,
    CHECK_LOGIN_USER_FAILURE,
    LOGOUT, CHANGE_LOGIN_PAGE,
} from "../actions/accountActions";
import {GV_LOGIN_PAGE_FIRST} from "../../lib/globalVariable";

const initialState = {
    /** Auth */
    pageNum: GV_LOGIN_PAGE_FIRST,
    register: {
        name: '',
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
        email: '',
    },
    auth: null,
    authError: null,
    authSentEmail: false,
    authInputEmail: false,
    /** Account */
    user: null,
    checkError: null,
};

export default handleActions(
    {
        [CHANGE_ACCOUNT_FIELD]: (state, { payload: { form, key, value } }) => produce(state, (draft) => {
            draft[form][key] = value; // state.register.username
        }),
        [CHANGE_LOGIN_PAGE]: (state, { payload: { value } }) => ({
            ...state,
            pageNum: value,
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SENT_EMAIL]: (state, { payload: error }) => ({
            ...state,
            authSentEmail: true,
        }),
        [LOGIN_INPUT_EMAIL]: (state, { payload: error }) => ({
            ...state,
            authInputEmail: true,
        }),
        [LOGIN_EMAIL_SENT_EMAIL]: (state, { payload: error }) => ({
            ...state,
            authSentEmail: true,
        }),
        [LOGIN_EMAIL_INPUT_EMAIL]: (state, { payload: error }) => ({
            ...state,
            authInputEmail: true,
        }),
        [LOGIN_CONFIRM_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [LOGIN_CONFIRM_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        /** Account */
        [SET_LOGIN_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_LOGIN_USER_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user: user.user.User,
            checkError: null,
        }),
        [CHECK_LOGIN_USER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        }),
    },
    initialState,
);
