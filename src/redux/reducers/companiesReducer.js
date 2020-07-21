import {List, Map} from "immutable";
import {handleActions} from "redux-actions";
import {
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAILURE,
    GET_COMPANIES_BY_NAME_SUCCESS,
    GET_COMPANIES_BY_NAME_FAILURE,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE,
    GET_USERS_BY_COMPANY_SUCCESS,
    GET_USERS_BY_COMPANY_FAILURE,
    GET_COMPANY_LIST_WITH_SEARCH_PARAM_SUCCESS,
    GET_COMPANY_LIST_WITH_SEARCH_PARAM_FAILURE,
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
    search: {
        data: null,
        msg: null,
        msgError: null,
    },
    allList: {
        data: null,
        msg: null,
        msgError: null,
    },
    userList: {
        data: null,
        msg: null,
        msgError: null,
    },
    msg: null,
    msgError: null,
    checkCompany: false,
    confirmCompany: false,
};

const companiesReducer = handleActions(
    {
        /** get companies List */
        [GET_COMPANY_LIST_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
        [GET_COMPANY_LIST_WITH_SEARCH_PARAM_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
        /** get companies by name */
        [GET_COMPANIES_BY_NAME_SUCCESS]: (state, action) => ({
            ...state,
            search: {
                ...state,
                msg: action.payload,
                msgError: null,
            },
        }),
        [GET_COMPANIES_BY_NAME_FAILURE]: (state, action) => ({
            ...state,
            search: {
                ...state,
                msg: null,
                msgError: action.payload,
            },
        }),
        /** get users by cpIdx */
        [GET_USERS_BY_COMPANY_SUCCESS]: (state, action) => ({
            ...state,
            userList: {
                ...state,
                msg: action.payload,
                msgError: null,
            },
        }),
        [GET_USERS_BY_COMPANY_FAILURE]: (state, action) => ({
            ...state,
            userList: {
                ...state,
                msg: null,
                msgError: action.payload,
            },
        }),
        /** get all companies */
        [GET_COMPANIES_SUCCESS]: (state, action) => ({
            ...state,
            allList: {
                ...state,
                msg: action.payload,
                msgError: null,
            },
        }),
        [GET_COMPANIES_FAILURE]: (state, action) => ({
            ...state,
            allList: {
                ...state,
                msg: null,
                msgError: action.payload,
            },
        }),
    },
    initialState,
);

export default companiesReducer;
