import produce from "immer";
import {List, Map} from "immutable";
import {handleActions} from 'redux-actions';
import {
    INITIALIZE_REGISTER_USER,
    GET_USER_LIST_SUCCESS,
    CHANGE_FIELD,
    ADD_EMAIL_GROUP,
    DELETE_EMAIL_GROUP,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    CHANGE_EMAIL_AUTH_FLAG,
    CHANGE_EMAIL_AUTH_GROUP_FLAG,
    USER_BASE_INFO_BY_COMPANY,
    CHECK_DUP_USER_SUCCESS,
    CHECK_DUP_USER_FAILURE, CHECK_USER_REGISTER_FIELD,
} from "../actions/usersActions";
import {checkPasswordPattern} from "../../lib/utils/utils";

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
        cpName: '',
        cpIdx: '',
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
        userId: "* 사용 가능한 ID 인지 확인하십시오.",
        password: "* 영어 소문자, 숫자, 특수문자 포함 8~16 문자",
        username: "",
        cellPhone: "",
        email: "",
        level: "",
        emailAuthValue: "",
        emailAuthFlag: "",
        emailAuthGroupFlag: "",
        emailAuthGroupList: "",
    },
    checkUser: false,
    confirmUser: false,
    msg: null,
    msgError: null,
};

const usersReducer = handleActions(
    {
        [INITIALIZE_REGISTER_USER]: () => ({
            register: {
                cpName: '',
                cpIdx: '',
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
                userId: "* 사용 가능한 ID 인지 확인하십시오.",
                password: "* 영어 소문자, 숫자, 특수문자 포함 8~16 문자",
                username: "",
                cellPhone: "",
                email: "",
                level: "",
                emailAuthValue: "",
                emailAuthFlag: "",
                emailAuthGroupFlag: "",
                emailAuthGroupList: "",
            },
            checkUser: false,
            confirmUser: false,
            msg: null,
            msgError: null,
        }),
        [GET_USER_LIST_SUCCESS]: (state, {payload: msg}) => ({
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
        [REGISTER_USER_SUCCESS]: (state, { payload: msg }) => ({
            ...state,
            msg,
            msgError: null,
        }),
        [REGISTER_USER_FAILURE]: (state, { payload: error }) => ({
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
                ...state,
                cpName: payload.cpName,
                username: payload.username,
                email: payload.email,
                cellPhone: payload.cellPhone,
                level: 5,
            },
            disabled: {
                ...state,
                username: true,
                email: true,
                cellPhone: true,
                level: true,
                emailAuthValue: true,
            },
        }),
        [CHECK_DUP_USER_SUCCESS]: state => ({
            ...state,
            isError: {
                ...state,
                userId: false,
            },
            helperText: {
                ...state,
                userId: "* 사용 가능한 아이디 입니다.",
                password: state.helperText.password,
            },
            checkUser: true,
            confirmUser: true,
        }),
        [CHECK_DUP_USER_FAILURE]: state => ({
            ...state,
            isError: {
                ...state,
                userId: true,
            },
            helperText: {
                ...state,
                userId: "* 이미 사용하고 있는 아이디 입니다!",
                password: state.helperText.password,

            },
            checkUser: true,
            confirmUser: false,
        }),
        [CHECK_USER_REGISTER_FIELD]: (state) => {
            const errorMsg = "* 필수 입력 사항입니다!";
            const nameErrorMsg = "* 아이디 중복을 확인하세요!";
            const emailErrorMsg = "* 잘못된 이메일 주소입니다!";
            // eslint-disable-next-line no-useless-escape
            const checkEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            // let isReady = true;
            let isCorrectEmail = true;

            if (state.register.email !== "" && checkEmail.test(state.register.email) === false) {
                isCorrectEmail = false;
            }
            return {
                ...state,
                isError: {
                    ...state,
                    userId: state.register.userId === "" ? true : (
                        !(state.checkUser && state.confirmUser)),
                    password: state.register.password === "" ? true : !(checkPasswordPattern(state.register.password)),
                    username: state.register.username === "",
                    email: state.register.email === "",
                    cellPhone: state.register.cellPhone === "",
                    level: state.register.level === "",
                },
                helperText: {
                    ...state,
                    // eslint-disable-next-line no-nested-ternary
                    userId: state.register.userId === "" ? errorMsg : (
                        state.checkUser && state.confirmUser ? "* 사용 가능한 아이디 입니다." : nameErrorMsg),
                    password: state.register.password === "" ? errorMsg : "* 영어 소문자, 숫자, 특수문자 포함 8~16 문자",
                    username: state.register.username === "" ? errorMsg : "",
                    // eslint-disable-next-line no-nested-ternary
                    email: state.register.email === "" ? errorMsg : (
                        isCorrectEmail ? "" : emailErrorMsg),
                    cellPhone: state.register.cellPhone === "" ? errorMsg : "",
                    level: true,
                },
            };
        },
    },
    initialState,
);

export default usersReducer;
