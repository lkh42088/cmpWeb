import produce from "immer";
import {List, Map} from "immutable";
import {handleActions} from 'redux-actions';
import {
    INITIALIZE_REGISTER_USER,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAILURE,
    GET_USER_LIST_WITH_SEARCH_PARAM_SUCCESS,
    GET_USER_LIST_WITH_SEARCH_PARAM_FAILURE,
    CHANGE_USER_FIELD,
    SET_USER_PAGE, SET_USER_IDX, SET_USER, SET_USER_BY_ID,
} from "../actions/usersActions";

const initialState = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0, // total count
        rows: 0,
        offset: 0,
    },
    msg: null,
    msgError: null,
    userPage: 'list',
    userIdx: '',
    user: {},
};

const usersReducer = handleActions(
    {
        [INITIALIZE_REGISTER_USER]: state => ({
            ...state,
            msg: null,
            msgError: null,
        }),
        [GET_USER_LIST_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            data: msg.data,
            page: msg.page,
        }),
        [GET_USER_LIST_WITH_SEARCH_PARAM_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            data: msg.data,
            page: msg.page,
        }),
        [CHANGE_USER_FIELD]: (state, { payload: { type, key, value } }) => produce(state, (draft) => {
            draft[type][key] = value;
        }),
        [SET_USER_PAGE]: (state, {payload}) => ({
           ...state,
           userPage: payload,
        }),
        [SET_USER_IDX]: (state, {payload}) => ({
            ...state,
            userIdx: payload,
        }),
        [SET_USER]: (state, {payload}) => ({
           ...state,
           user: payload,
        }),
        [SET_USER_BY_ID]: (state, {payload}) => ({
            ...state,
            user: payload,
        }),
    },
    initialState,
);

export default usersReducer;
