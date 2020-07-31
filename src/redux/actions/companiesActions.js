import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as companies from "../../lib/api/company";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const SET_COMPANY_PAGE = 'company/SET_COMPANY_PAGE';
export const SET_COMPANY_IDX = 'company/SET_COMPANY_IDX';
export const SET_COMPANY = 'company/SET_COMPANY';

/** Saga Action Type */
export const [GET_COMPANIES, GET_COMPANIES_SUCCESS, GET_COMPANIES_FAILURE] = createRequestActionTypes('company/GET_COMPANIES');
export const [GET_COMPANY_LIST, GET_COMPANY_LIST_SUCCESS, GET_COMPANY_LIST_FAILURE] = createRequestActionTypes('company/COMPANYLIST');
export const [
    GET_COMPANY_LIST_WITH_SEARCH_PARAM,
    GET_COMPANY_LIST_WITH_SEARCH_PARAM_SUCCESS,
    GET_COMPANY_LIST_WITH_SEARCH_PARAM_FAILURE,
] = createRequestActionTypes('company/COMPANYLIST_WITH_SEARCH_PARAM');

export const [GET_COMPANIES_BY_NAME, GET_COMPANIES_BY_NAME_SUCCESS, GET_COMPANIES_BY_NAME_FAILURE] = createRequestActionTypes('company/GET_COMPANIES_BY_NAME');
export const [GET_USERS_BY_COMPANY, GET_USERS_BY_COMPANY_SUCCESS, GET_USERS_BY_COMPANY_FAILURE] = createRequestActionTypes('company/GET_USERS_BY_COMPANY');
export const [SET_COMPANY_BY_NAME] = createRequestActionTypes('company/SET_COMPANY_BY_NAME');

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
/** Saga Action Function */
export const getCompanyList = createAction(GET_COMPANY_LIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));

export const getCompanyListWithSearchParam = createAction(GET_COMPANY_LIST_WITH_SEARCH_PARAM, ({
    rows, offset, orderBy, order, searchParam,
}) => ({
    rows, offset, orderBy, order, searchParam,
}));

export const setCompanyPage = createAction(SET_COMPANY_PAGE,
    companyPage => companyPage);
export const setCompanyIdx = createAction(SET_COMPANY_IDX, companyIdx => companyIdx);
export const setCompany = createAction(SET_COMPANY, data => data);

export const getCompanyByName = createAction(SET_COMPANY_BY_NAME, ({ name }) => ({ name }));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getCompanyListSaga = createRequestSaga(GET_COMPANY_LIST, companies.getCompanyList);
const getCompanyListWithSearchParamSaga = createRequestSaga(GET_COMPANY_LIST_WITH_SEARCH_PARAM, companies.getCompanyListWithSearchParam);
const getCompaniesByNameSaga = createRequestSaga(GET_COMPANIES_BY_NAME, companies.getCompaniesByName);
const getUsersByCpIdxSaga = createRequestSaga(GET_USERS_BY_COMPANY, companies.getUsersByCpIdx);
const getCompaniesSaga = createRequestSaga(GET_COMPANIES, companies.getCompanies);
const getCompanyByNameSaga = createRequestSaga(SET_COMPANY_BY_NAME, companies.getCompanyByName);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* companiesSaga() {
    yield takeLatest(GET_COMPANY_LIST, getCompanyListSaga);
    yield takeLatest(GET_COMPANY_LIST_WITH_SEARCH_PARAM, getCompanyListWithSearchParamSaga);
    yield takeLatest(GET_COMPANIES, getCompaniesSaga);
    yield takeLatest(GET_COMPANIES_BY_NAME, getCompaniesByNameSaga);
    yield takeLatest(GET_USERS_BY_COMPANY, getUsersByCpIdxSaga);
    yield takeLatest(SET_COMPANY_BY_NAME, getCompanyByNameSaga);
}
