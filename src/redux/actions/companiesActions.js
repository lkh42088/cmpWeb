import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as companies from "../../lib/api/company";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
/** A. Company List Page */
export const [COMPANYLIST, COMPANYLIST_SUCCESS, COMPANYLIST_FAILURE] = createRequestActionTypes(
    'company/COMPANYLIST',
);

/** B. Company Register Page */
export const COMPANY_CHANGE_REGISTER_FIELD = 'company/CHANGE_REGISTER_FIELD';
export const COMPANY_CHANGE_FIELD = 'company/CHANGE_FIELD';
export const [ADD_COMPANY, ADD_COMPANY_SUCCESS, ADD_COMPANY_FAILURE] = createRequestActionTypes(
    'company/ADD_COMPANY',
);
export const [CHECK_DUP_COMPANY, CHECK_DUP_COMPANY_SUCCESS, CHECK_DUP_COMPANY_FAILURE] = createRequestActionTypes(
    'company/CHECK_DUP_COMPANY',
);

export const INITIALIZE_COMPANY = 'company/INITIALIZE_COMPANY';
export const COMPANY_REGISTER_CHECK_FIELD = 'company/COMPANY_REGISTER_CHECK_FIELD';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
/** A. Company List Page */
export const getCompanyList = createAction(COMPANYLIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));

/** B. Company Register Page */
export const changeCompanyRegField = createAction(
    COMPANY_CHANGE_REGISTER_FIELD,
    ({ key, value }) => ({ key, value }),
);

export const initializeCompany = createAction(INITIALIZE_COMPANY);

export const checkCompanyRegisterCheckField = createAction(COMPANY_REGISTER_CHECK_FIELD);

/** C. Function about Saga */
export const addCompany = createAction(ADD_COMPANY, ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
}) => ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
}));

export const checkDuplicatedCompany = createAction(CHECK_DUP_COMPANY, ({
    cpName,
}) => ({
    cpName,
}));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
/** A. Company List Page */
const getCompanyListSaga = createRequestSaga(COMPANYLIST, companies.getCompanyList);

/** B. Company Register Page */
const addCompanySaga = createRequestSaga(ADD_COMPANY, companies.addCompany);
const checkDeplicatedCompanySaga = createRequestSaga(CHECK_DUP_COMPANY, companies.checkDuplicatedCompany);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* companiesSaga() {
    /** A. Company List Page */
    yield takeLatest(COMPANYLIST, getCompanyListSaga);
    /** B. Company Register Page */
    yield takeLatest(ADD_COMPANY, addCompanySaga);
    yield takeLatest(CHECK_DUP_COMPANY, checkDeplicatedCompanySaga);
}
