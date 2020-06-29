import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as companies from "../../lib/api/company";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const COMPANY_CHANGE_REGISTER_FIELD = 'company/CHANGE_REGISTER_FIELD';
export const CHECK_COMPANY_REGISTER_FIELD = 'company/COMPANY_REGISTER_CHECK_FIELD';
export const COMPANY_CHANGE_FIELD = 'company/CHANGE_FIELD';
export const INITIALIZE_REGISTER_COMPANY = 'company/INITIALIZE_COMPANY';
export const CLEAR_COMPANY_SEARCH = 'company/CLEAR_COMPANY_SEARCH';

/** Saga Action Type */
export const [CHECK_DUP_COMPANY, CHECK_DUP_COMPANY_SUCCESS, CHECK_DUP_COMPANY_FAILURE] = createRequestActionTypes('company/CHECK_DUP_COMPANY');
export const [GET_COMPANIES, GET_COMPANIES_SUCCESS, GET_COMPANIES_FAILURE] = createRequestActionTypes('company/GET_COMPANIES');
export const [GET_COMPANY_LIST, GET_COMPANY_LIST_SUCCESS, GET_COMPANY_LIST_FAILURE] = createRequestActionTypes('company/COMPANYLIST');
export const [GET_COMPANIES_BY_NAME, GET_COMPANIES_BY_NAME_SUCCESS, GET_COMPANIES_BY_NAME_FAILURE] = createRequestActionTypes('company/GET_COMPANIES_BY_NAME');
export const [ADD_COMPANY, ADD_COMPANY_SUCCESS, ADD_COMPANY_FAILURE] = createRequestActionTypes('company/ADD_COMPANY');
export const [GET_USERS_BY_COMPANY, GET_USERS_BY_COMPANY_SUCCESS, GET_USERS_BY_COMPANY_FAILURE] = createRequestActionTypes('company/GET_USERS_BY_COMPANY');

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const initRegisterCompany = createAction(INITIALIZE_REGISTER_COMPANY);
export const clearCompanySearch = createAction(CLEAR_COMPANY_SEARCH);
export const checkCompanyRegisterField = createAction(CHECK_COMPANY_REGISTER_FIELD);
export const changeCompanyRegisterField = createAction(COMPANY_CHANGE_REGISTER_FIELD, ({ key, value }) => ({ key, value }));
export const changeCompanyField = createAction(COMPANY_CHANGE_FIELD, ({ type, key, value }) => ({ type, key, value }));

/** Saga Action Function */
export const checkDupCompany = createAction(CHECK_DUP_COMPANY, ({ cpName }) => ({ cpName }));
export const getCompaniesByName = createAction(GET_COMPANIES_BY_NAME, ({ cpName }) => ({ cpName }));
export const getUsersByCpIdx = createAction(GET_USERS_BY_COMPANY, ({ cpIdx }) => ({ cpIdx }));
export const getCompanies = createAction(GET_COMPANIES);
export const getCompanyList = createAction(GET_COMPANY_LIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));
export const addCompany = createAction(ADD_COMPANY, ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
    userId, userPassword,
}) => ({
    cpName,
    cpZip,
    cpAddr,
    cpAddrDetail,
    cpHomepage,
    cpTel,
    cpEmail,
    cpIsCompany,
    cpMemo,
    cpTerminationDate,
    userId,
    userPassword,
}));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getCompanyListSaga = createRequestSaga(GET_COMPANY_LIST, companies.getCompanyList);
const addCompanySaga = createRequestSaga(ADD_COMPANY, companies.registerCompany);
const checkDuplicatedCompanySaga = createRequestSaga(CHECK_DUP_COMPANY, companies.checkDupCompany);
const getCompaniesByNameSaga = createRequestSaga(GET_COMPANIES_BY_NAME, companies.getCompaniesByName);
const getUsersByCpIdxSaga = createRequestSaga(GET_USERS_BY_COMPANY, companies.getUsersByCpIdx);
const getCompaniesSaga = createRequestSaga(GET_COMPANIES, companies.getCompanies);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* companiesSaga() {
    yield takeLatest(GET_COMPANY_LIST, getCompanyListSaga);
    yield takeLatest(GET_COMPANIES, getCompaniesSaga);
    yield takeLatest(GET_COMPANIES_BY_NAME, getCompaniesByNameSaga);
    yield takeLatest(GET_USERS_BY_COMPANY, getUsersByCpIdxSaga);
    yield takeLatest(ADD_COMPANY, addCompanySaga);
    yield takeLatest(CHECK_DUP_COMPANY, checkDuplicatedCompanySaga);
}
