import produce from "immer";
import {List, Map} from "immutable";
import {handleActions} from 'redux-actions';
import {
    INITIALIZE,
    USERLIST_SUCCESS,
    CHANGE_FIELD,
    ADD_EMAIL_GROUP,
    DELETE_EMAIL_GROUP,
    REGUSER_SUCCESS,
    REGUSER_FAILURE,
    CHANGE_EMAIL_AUTH_FLAG,
    CHANGE_EMAIL_AUTH_GROUP_FLAG,
    USER_BASE_INFO_BY_COMPANY,
} from "../actions/usersActions";

const initialState = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0, // total count
        rows: 0,
        offset: 0,
    },
    register: {
        userId: '',
        password: '',
        username: '',
        cellPhone: '',
        email: '',
        level: '',
        emailAuthValue: "",
        emailAuthFlag: false,
        emailAuthGroupFlag: false,
        emailAuthGroupList: [],
    },
    isError: {
        userId: false,
        password: false,
        username: false,
        cellPhone: false,
        email: false,
        level: false,
        emailAuthValue: false,
        emailAuthFlag: false,
        emailAuthGroupFlag: false,
        emailAuthGroupList: false,
    },
    required: {
        userId: true,
        password: true,
        username: true,
        cellPhone: true,
        email: true,
        level: true,
        emailAuthValue: false,
        emailAuthFlag: false,
        emailAuthGroupFlag: false,
        emailAuthGroupList: false,
    },
    disabled: {
        userId: false,
        password: false,
        username: false,
        cellPhone: false,
        email: false,
        level: false,
        emailAuthValue: false,
        emailAuthFlag: false,
        emailAuthGroupFlag: false,
        emailAuthGroupList: false,
    },
    helperText: {
        userId: "",
        password: "",
        username: "",
        cellPhone: "",
        email: "",
        level: "",
        emailAuthValue: "",
        emailAuthFlag: "",
        emailAuthGroupFlag: "",
        emailAuthGroupList: "",
    },
    checkDupUser: false,
    confirmUser: false,
    msg: null,
    msgError: null,
};

const usersReducer = handleActions(
    {
        [INITIALIZE]: () => ({
            register: {
                userId: '',
                password: '',
                username: '',
                cellPhone: '',
                email: '',
                level: '',
                emailAuthValue: "",
                emailAuthFlag: false,
                emailAuthGroupFlag: false,
                emailAuthGroupList: [],
            },
            isError: {
                userId: false,
                password: false,
                username: false,
                cellPhone: false,
                email: false,
                level: false,
                emailAuthValue: false,
                emailAuthFlag: false,
                emailAuthGroupFlag: false,
                emailAuthGroupList: false,
            },
            required: {
                userId: true,
                password: true,
                username: true,
                cellPhone: true,
                email: true,
                level: true,
                emailAuthValue: false,
                emailAuthFlag: false,
                emailAuthGroupFlag: false,
                emailAuthGroupList: false,
            },
            disabled: {
                userId: false,
                password: false,
                username: false,
                cellPhone: false,
                email: false,
                level: false,
                emailAuthValue: false,
                emailAuthFlag: false,
                emailAuthGroupFlag: false,
                emailAuthGroupList: false,
            },
            helperText: {
                userId: "",
                password: "",
                username: "",
                cellPhone: "",
                email: "",
                level: "",
                emailAuthValue: "",
                emailAuthFlag: "",
                emailAuthGroupFlag: "",
                emailAuthGroupList: "",
            },
            checkDupUser: false,
            confirmUser: false,
            msg: null,
            msgError: null,
        }),
        [USERLIST_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            data: msg.data,
            page: msg.page,
        }),
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => produce(state, (draft) => {
                    draft.register[key] = value;
        }),
        [ADD_EMAIL_GROUP]: (state, {payload: emailAuthGroupList}) => ({
            ...state,
            emailAuthGroupList,
        }),
        [DELETE_EMAIL_GROUP]: (state, {payload: emailAuthGroupList}) => ({
            ...state,
            emailAuthGroupList,
        }),
        [REGUSER_SUCCESS]: (state, { payload: msg }) => ({
            ...state,
            msg,
            msgError: null,
        }),
        [REGUSER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            msgError: error,
        }),
        [CHANGE_EMAIL_AUTH_FLAG]: state => produce(state, (draft) => {
            draft.emailAuthFlag = !draft.emailAuthFlag;
        }),
        [CHANGE_EMAIL_AUTH_GROUP_FLAG]: state => produce(state, (draft) => {
            draft.emailAuthGroupFlag = !draft.emailAuthGroupFlag;
        }),
        [USER_BASE_INFO_BY_COMPANY]: (state, {payload}) => ({
            ...state,
            register: {
                username: payload.username,
                email: payload.email,
                cellPhone: payload.cellPhone,
                level: 5,
            },
        }),
    },
    initialState,
);

export default usersReducer;
