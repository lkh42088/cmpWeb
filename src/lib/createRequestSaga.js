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

    console.log('createLoginRequestSaga: ', type);
    // eslint-disable-next-line func-names
    return function* (action) {
        console.log('Login Saga action: ', type);
        yield put(startLoading(type));
        try {
            const response = yield call(request, action.payload);
            if (response.status === 251) {
                const ACTION_TYPE = `${type}_SENT_EMAIL`;
                console.log("type:", ACTION_TYPE, ", payload(data): ", response.data);
                yield put({
                    type: ACTION_TYPE,
                    payload: response.data,
                });
            } else if (response.status === 252) {
                const ACTION_TYPE = `${type}_INPUT_EMAIL`;
                console.log("type:", ACTION_TYPE, ", payload(data): ", response.data);
                yield put({
                    type: ACTION_TYPE,
                    payload: response.data,
                });
            } else {
                console.log('type:', SUCCESS);
                yield put({
                    type: SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) {
            console.log('Login Saga fail: ', FAILURE, 'payload(e):', e);
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type));
    };
}
