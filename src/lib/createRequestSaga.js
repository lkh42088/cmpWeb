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
        console.log('Saga action: ', type);
        yield put(startLoading(type));
        try {
            const response = yield call(request, action.payload);
            console.log('type:', SUCCESS);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            console.log('Saga fail: ', FAILURE, 'payload(e):', e);
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type));
    };
}
