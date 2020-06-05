import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as users from "../../lib/api/users";

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const [USERLIST, USERLIST_SUCCESS, USERLIST_FAILURE] = createRequestActionTypes(
    'user/USERLIST',
);

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const getUserList = createAction(USERLIST, ({
    rows, offset,
}) => ({
    rows, offset,
}));

/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const getUserListSaga = createRequestSaga(USERLIST, users.getUserList);

/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* userListSaga() {
    yield takeLatest(USERLIST, getUserListSaga);
}
