import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as companies from "../../lib/api/company";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const [COMPANYLIST, COMPANYLIST_SUCCESS, COMPANYLIST_FAILURE] = createRequestActionTypes(
    'company/COMPANYLIST',
);

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const getCompanyList = createAction(COMPANYLIST, ({
    rows, offset, orderBy, order,
}) => ({
    rows, offset, orderBy, order,
}));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getCompanyListSaga = createRequestSaga(COMPANYLIST, companies.getCompanyList);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* companiesSaga() {
    yield takeLatest(COMPANYLIST, getCompanyListSaga);
}
