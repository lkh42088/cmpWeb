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
export const INITIALIZE_COMPANY = 'company/INITIALIZE_COMPANY';

/** Saga Action Type */
export const [GET_COMPANY_LIST, GET_COMPANY_LIST_SUCCESS, GET_COMPANY_LIST_FAILURE] = createRequestActionTypes('company/COMPANYLIST');
export const [ADD_COMPANY, ADD_COMPANY_SUCCESS, ADD_COMPANY_FAILURE] = createRequestActionTypes('company/ADD_COMPANY');
export const [CHECK_DUP_COMPANY, CHECK_DUP_COMPANY_SUCCESS, CHECK_DUP_COMPANY_FAILURE] = createRequestActionTypes('company/CHECK_DUP_COMPANY');

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const initializeCompany = createAction(INITIALIZE_COMPANY);
export const checkCompanyRegisterField = createAction(CHECK_COMPANY_REGISTER_FIELD);
export const changeCompanyRegisterField = createAction(COMPANY_CHANGE_REGISTER_FIELD, ({ key, value }) => ({ key, value }));
export const changeCompanyField = createAction(COMPANY_CHANGE_REGISTER_FIELD, ({ type, key, value }) => ({ type, key, value }));

/** Saga Action Function */
export const checkDupCompany = createAction(CHECK_DUP_COMPANY, ({ cpName }) => ({ cpName }));
export const getCompanyList = createAction(GET_COMPANY_LIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));
export const addCompany = createAction(ADD_COMPANY, ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
}) => ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
}));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getCompanyListSaga = createRequestSaga(GET_COMPANY_LIST, companies.getCompanyList);
const addCompanySaga = createRequestSaga(ADD_COMPANY, companies.registerCompany);
const checkDeplicatedCompanySaga = createRequestSaga(CHECK_DUP_COMPANY, companies.checkDupCompany);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* companiesSaga() {
    yield takeLatest(GET_COMPANY_LIST, getCompanyListSaga);
    yield takeLatest(ADD_COMPANY, addCompanySaga);
    yield takeLatest(CHECK_DUP_COMPANY, checkDeplicatedCompanySaga);
}
