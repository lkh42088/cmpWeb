import {handleActions} from "redux-actions";
import produce from "immer";
import {
    CHANGE_ACCOUNT_FIELD,
    INITIALIZE_FORM,
    LOGIN_EMAIL_INPUT_EMAIL,
    LOGIN_EMAIL_SENT_EMAIL,
    LOGIN_INPUT_EMAIL,
    LOGIN_SENT_EMAIL,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SET_LOGIN_USER,
    CHECK_LOGIN_USER_SUCCESS,
    CHECK_LOGIN_USER_FAILURE,
    LOGOUT, CHANGE_LOGIN_PAGE,
} from "../actions/accountActions";
import {GV_LOGIN_PAGE_FIRST} from "../../lib/globalVariable";

const initialState = {
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
        [INITIALIZE_FORM]: state => ({
            ...state,
            pageNum: GV_LOGIN_PAGE_FIRST,
            login: {
                username: '',
                password: '',
                email: '',
            },
            auth: null,
            authError: null,
            authSentEmail: false,
            authInputEmail: false,
            user: null,
            checkError: null,
        }),
        [CHANGE_ACCOUNT_FIELD]: (state, { payload: { form, key, value } }) => produce(state, (draft) => {
            draft[form][key] = value; // state.register.username
        }),
        [CHANGE_LOGIN_PAGE]: (state, { payload: { value } }) => ({
            ...state,
            pageNum: value,
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
            login: {
                username: '',
                password: '',
                email: '',
            },
            auth: null,
            authError: null,
            authSentEmail: false,
            authInputEmail: false,
            checkError: null,
            user: null,
        }),
    },
    initialState,
);
