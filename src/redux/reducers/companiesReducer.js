import {List, Map} from "immutable";
import {handleActions} from "redux-actions";
import produce from "immer";
import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    COMPANY_CHANGE_FIELD,
    COMPANY_CHANGE_REGISTER_FIELD,
    GET_COMPANY_LIST_SUCCESS,
    INITIALIZE_REGISTER_COMPANY,
    CHECK_DUP_COMPANY_SUCCESS,
    CHECK_DUP_COMPANY_FAILURE,
    CHECK_COMPANY_REGISTER_FIELD,
    GET_COMPANIES_BY_NAME_SUCCESS,
    GET_COMPANIES_BY_NAME_FAILURE,
    GET_COMPANIES_SUCCESS,
    CLEAR_COMPANY_SEARCH,
} from "../actions/companiesActions";

const initialState = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0,
        rows: 0,
        offset: 0,
    },
    register: {
        cpName: "",
        cpZip: "",
        cpAddr: "",
        cpAddrDetail: "",
        cpHomepage: "",
        cpTel: "",
        cpEmail: "",
        cpIsCompany: false,
        cpMemo: "",
        cpTerminationDate: new Date(),
    },
    isError: {
        cpName: false,
        cpZip: false,
        cpAddr: false,
        cpAddrDetail: false,
        cpHomepage: false,
        cpTel: false,
        cpEmail: false,
        cpIsCompany: false,
        cpMemo: false,
        cpTerminationDate: false,
    },
    required: {
        cpName: true,
        cpZip: true,
        cpAddr: true,
        cpAddrDetail: true,
        cpHomepage: false,
        cpTel: true,
        cpEmail: true,
        cpIsCompany: false,
        cpMemo: false,
        cpTerminationDate: false,
    },
    disabled: {
        cpName: false,
        cpZip: true,
        cpAddr: true,
        cpAddrDetail: false,
        cpHomepage: false,
        cpTel: false,
        cpEmail: false,
        cpIsCompany: false,
        cpMemo: false,
        cpTerminationDate: false,
    },
    helperText: {
        cpName: "* 사용 가능한 이름인지 확인하십시오.",
        cpZip: "* 우편번호를 검색하십시오.",
        cpAddr: "",
        cpAddrDetail: "",
        cpHomepage: "",
        cpTel: "",
        cpEmail: "",
        cpIsCompany: "",
        cpMemo: "",
        cpTerminationDate: "",
    },
    msg: null,
    msgError: null,
    checkCompany: false,
    confirmCompany: false,
    searchMsg: null,
    searchMsgError: null,
};

const companiesReducer = handleActions(
    {
        [INITIALIZE_REGISTER_COMPANY]: state => ({
            ...state,
            register: {
                cpName: "",
                cpZip: "",
                cpAddr: "",
                cpAddrDetail: "",
                cpHomepage: "",
                cpTel: "",
                cpEmail: "",
                cpIsCompany: false,
                cpMemo: "",
                cpTerminationDate: new Date(),
            },
            isError: {
                cpName: false,
                cpZip: false,
                cpAddr: false,
                cpAddrDetail: false,
                cpHomepage: false,
                cpTel: false,
                cpEmail: false,
                cpIsCompany: false,
                cpMemo: false,
                cpTerminationDate: false,
            },
            required: {
                cpName: true,
                cpZip: true,
                cpAddr: true,
                cpAddrDetail: true,
                cpHomepage: false,
                cpTel: true,
                cpEmail: true,
                cpIsCompany: false,
                cpMemo: false,
                cpTerminationDate: false,
            },
            disabled: {
                cpName: false,
                cpZip: true,
                cpAddr: true,
                cpAddrDetail: false,
                cpHomepage: false,
                cpTel: false,
                cpEmail: false,
                cpIsCompany: false,
                cpMemo: false,
                cpTerminationDate: false,
            },
            helperText: {
                cpName: "* 사용 가능한 고객사명인지 확인하십시오.",
                cpZip: "* 우편번호를 검색하십시오.",
                cpAddr: "",
                cpAddrDetail: "",
                cpHomepage: "",
                cpTel: "",
                cpEmail: "",
                cpIsCompany: "",
                cpMemo: "",
                cpTerminationDate: "",
            },
            msg: null,
            msgError: null,
            checkCompany: false,
            confirmCompany: false,
        }),
        [CLEAR_COMPANY_SEARCH]: state => ({
            ...state,
            searchMsg: null,
            searchMsgError: null,
        }),
        /** get companies List */
        [GET_COMPANY_LIST_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
        /** get companies by name */
        [GET_COMPANIES_BY_NAME_SUCCESS]: (state, action) => ({
            ...state,
            searchMsg: action.payload,
        }),
        [GET_COMPANIES_BY_NAME_FAILURE]: (state, action) => ({
            ...state,
            searchMsg: action.payload,
        }),
        /** get all companies */
        [GET_COMPANIES_SUCCESS]: (state, action) => ({
            ...state,
            searchMsg: action.payload.data,
        }),
        [COMPANY_CHANGE_REGISTER_FIELD]: (state, { payload: { key, value }}) => produce(state, (draft) => {
            draft.register[key] = value;
            draft.isError[key] = "";
            draft.helperText[key] = false;
        }),
        [COMPANY_CHANGE_FIELD]: (state, { payload: { type, key, value }}) => produce(state, (draft) => {
            draft[type][key] = value;
        }),
        [ADD_COMPANY_SUCCESS]: (state, action) => ({
            ...state,
            msg: action.payload,
        }),
        [ADD_COMPANY_FAILURE]: (state, action) => ({
            ...state,
            msgError: action.payload,
        }),
        [CHECK_DUP_COMPANY_SUCCESS]: (state, action) => ({
            ...state,
            isError: {
                ...state,
                cpName: false,
            },
            helperText: {
                ...state,
                cpName: "* 사용 가능한 고객사명 입니다.",
            },
            checkCompany: true,
            confirmCompany: true, // 동일한 회사가 없음
        }),
        [CHECK_DUP_COMPANY_FAILURE]: (state, action) => ({
            ...state,
            isError: {
                ...state,
                cpName: true,
            },
            helperText: {
                ...state,
                cpName: "* 이미 사용하고 있는 고객사명 입니다.",
                cpZip: state.helperText.cpZip,
            },
            checkCompany: true,
            confirmCompany: false, // 동일한 회사가 있음
        }),
        [CHECK_COMPANY_REGISTER_FIELD]: (state) => {
            const errorMsg = "* 필수 입력 사항입니다!";
            const nameErrorMsg = "* 고객사 중복을 확인하세요!";
            const emailErrorMsg = "* 잘못된 이메일 주소입니다!";
            // eslint-disable-next-line no-useless-escape
            const checkEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            // let isReady = true;
            let isCorrectEmail = true;

            if (state.register.cpEmail !== "" && checkEmail.test(state.register.cpEmail) === false) {
                isCorrectEmail = false;
            }

            return {
                ...state,
                isError: {
                    ...state,
                    cpName: state.register.cpName === "" ? true : (
                        !(state.checkCompany && state.confirmCompany)),
                    cpZip: state.register.cpZip === "",
                    cpAddr: state.register.cpAddr === "",
                    cpAddrDetail: state.register.cpAddrDetail === "",
                    cpTel: state.register.cpTel === "",
                    // eslint-disable-next-line no-nested-ternary
                    cpEmail: state.register.cpEmail === "" ? true : (!isCorrectEmail),
                },
                helperText: {
                    ...state,
                    // eslint-disable-next-line no-nested-ternary
                    cpName: state.register.cpName === "" ? errorMsg : (
                        state.checkCompany && state.confirmCompany ? "* 사용 가능한 고객사명 입니다." : nameErrorMsg),
                    cpZip: state.register.cpZip === "" ? errorMsg : "* 우편번호를 검색하십시오.",
                    cpAddr: state.register.cpAddr === "" ? errorMsg : "",
                    cpAddrDetail: state.register.cpAddrDetail === "" ? errorMsg : "",
                    cpTel: state.register.cpTel === "" ? errorMsg : "",
                    // eslint-disable-next-line no-nested-ternary
                    cpEmail: state.register.cpEmail === "" ? errorMsg : (
                        isCorrectEmail ? "" : emailErrorMsg),
                },
            };
        },
    },
    initialState,
);

export default companiesReducer;
