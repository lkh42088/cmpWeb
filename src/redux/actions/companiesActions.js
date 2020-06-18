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
export const COMPANY_REG_CHANGE_FIELD = 'company/CHANGE_REG_FIELD';

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
    COMPANY_REG_CHANGE_FIELD,
    ({ key, value }) => ({ key, value }),
);

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
/** A. Company List Page */
const getCompanyListSaga = createRequestSaga(COMPANYLIST, companies.getCompanyList);

/** B. Company Register Page */

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* companiesSaga() {
    /** A. Company List Page */
    yield takeLatest(COMPANYLIST, getCompanyListSaga);
    /** B. Company Register Page */
}
