import {List, Map} from "immutable";
import {handleActions} from "redux-actions";
import produce from "immer";
import {
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    COMPANY_CHANGE_FIELD,
    COMPANY_CHANGE_REGISTER_FIELD,
    COMPANYLIST_SUCCESS, INITIALIZE_COMPANY,
    CHECK_DUP_COMPANY_SUCCESS,
    CHECK_DUP_COMPANY_FAILURE, COMPANY_REGISTER_CHECK_FIELD,
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
        cpName: "",
        cpZip: "",
        cpAddr: "",
        cpAddrDetail: "",
        cpHomepage: "",
        cpTel: "",
        cpEmail: "",
        cpIsCompany: "",
        cpMemo: "",
        cpTerminationDate: "",
    },
    responseData: null,
    responseError: null,
    checkDupCompany: false,
    confirmCompany: false,
};

const companiesReducer = handleActions(
    {
        [INITIALIZE_COMPANY]: state => ({
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
                cpName: "",
                cpZip: "",
                cpAddr: "",
                cpAddrDetail: "",
                cpHomepage: "",
                cpTel: "",
                cpEmail: "",
                cpIsCompany: "",
                cpMemo: "",
                cpTerminationDate: "",
            },
            responseData: null,
            responseError: null,
            checkDupCompany: false,
            confirmCompany: false,
        }),
        [COMPANYLIST_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
        [COMPANY_CHANGE_REGISTER_FIELD]: (state, { payload: { key, value }}) => produce(state, (draft) => {
            draft.register[key] = value;
        }),
        [COMPANY_CHANGE_FIELD]: (state, { payload: { type, key, value }}) => produce(state, (draft) => {
            draft[type][key] = value;
        }),
        [ADD_COMPANY_SUCCESS]: (state, action) => ({
            ...state,
            responseData: action.payload,
        }),
        [ADD_COMPANY_FAILURE]: (state, action) => ({
            ...state,
            responseError: action.payload,
        }),
        [CHECK_DUP_COMPANY_SUCCESS]: (state, action) => ({
            ...state,
            checkDupCompany: true,
            confirmCompany: true, // 동일한 회사가 없음
        }),
        [CHECK_DUP_COMPANY_FAILURE]: (state, action) => ({
            ...state,
            checkDupCompany: true,
            confirmCompany: false, // 동일한 회사가 있음
        }),
        [COMPANY_REGISTER_CHECK_FIELD]: (state) => {
            const errorMsg = "* 필수 입력 사항입니다!";
            return {
                ...state,
                isError: {
                    cpName: state.register.cpName === "",
                    cpZip: state.register.cpZip === "",
                    cpAddr: state.register.cpAddr === "",
                    cpAddrDetail: state.register.cpAddrDetail === "",
                    cpTel: state.register.cpTel === "",
                    cpEmail: state.register.cpEmail === "",
                },
                helperText: {
                    cpName: state.register.cpName === "" ? errorMsg : "",
                    cpZip: state.register.cpZip === "" ? errorMsg : "",
                    cpAddr: state.register.cpAddr === "" ? errorMsg : "",
                    cpAddrDetail: state.register.cpAddrDetail === "" ? errorMsg : "",
                    cpTel: state.register.cpTel === "" ? errorMsg : "",
                    cpEmail: state.register.cpEmail === "" ? errorMsg : "",
                },
            };
        },
    },
    initialState,
);

export default companiesReducer;
