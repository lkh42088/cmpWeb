import { handleActions } from "redux-actions";
import produce from 'immer';
import {
    CHANGE_FIELD,
    INITIALIZE_FORM,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../actions/authActions';

// 초기 값
const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const authReducer = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => produce(state, (draft) => {
            // eslint-disable-next-line no-param-reassign
                draft[form][key] = value; // state.register.username
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);
export default authReducer;
