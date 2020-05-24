import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../redux/actions/loadingActions';

export const createRequestActionTypes = (type) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    console.log('createRequestSaga: ', type);
    // eslint-disable-next-line func-names
    return function* (action) {
        console.log('function: ', type);
        yield put(startLoading(type));
        try {
            const response = yield call(request, action.payload);
            console.log('success: ', type);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            console.log('fail: ', type);
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type));
    };
}
