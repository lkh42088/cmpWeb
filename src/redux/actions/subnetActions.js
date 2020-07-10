import {createAction} from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as subnet from '../../lib/api/subnet';

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
export const INIT_SUBNET = 'subnet/INIT';
export const CREATE_SUBNET = 'subnet/CREATE';
export const SEARCH_DEVICE_SUBNET = 'subnet/SEARCH_DEVICE';
export const [READ_SUBNET, READ_SUBNET_SUCCESS, READ_SUBNET_FAILURE] = createRequestActionTypes('subnet/READ');
export const UPDATE_SUBNET = 'subnet/UPDATE';
export const DELETE_SUBNET = 'subnet/DELETE';
export const INPUT_SUBNET = 'subnet/INPUT';


/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
// export const initSubnet = createAction(INIT_SUBNET);
export const createSubnet = createAction(CREATE_SUBNET, ({
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => ({
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}));
// 장비코드로 검색한 결과를 표시
export const searchDeviceSubnet = createAction(SEARCH_DEVICE_SUBNET, ({
    deviceCode, deviceType, customer,
}) => ({
    deviceCode, deviceType, customer,
}));
// export const readSubnet = createAction(READ_SUBNET, ({
//     idx, subnetTag, usbnetStart, subnetEnd, subnetMask, gateway, page, totalPage,
// }) => ({
//     idx, subnetTag, usbnetStart, subnetEnd, subnetMask, gateway, page, totalPage,
// }));
// export const readSubnet = createAction(READ_SUBNET, ({
//     rows, offset, orderBy, order,
// }) => ({
//     rows, offset, orderBy, order,
// }));
export const updateSubnet = createAction(UPDATE_SUBNET);
export const deleteSubnet = createAction(DELETE_SUBNET);
export const inputSubnet = createAction(
    INPUT_SUBNET,
    ({key, value}) => ({key, value}),
);


/******************************************************************************
 * 3. Saga
 *****************************************************************************/
const sendCreateSubnetSaga = createRequestSaga(CREATE_SUBNET, subnet.createSubnet);
// const sendReadSubnetSaga = createRequestSaga(READ_SUBNET, subnet.readSubnet);


/******************************************************************************
 * 4. Saga Generation Function
 *****************************************************************************/
export function* createSubnetSaga() {
    yield takeLatest(CREATE_SUBNET, sendCreateSubnetSaga);
}
// export function* readSubnetSaga() {
//     yield takeLatest(READ_SUBNET, sendReadSubnetSaga);
// }
