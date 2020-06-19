import produce from "immer";
import {List, Map} from "immutable";
import {handleActions} from 'redux-actions';
import {
    INITIALIZE,
    CHANGE_FIELD,
    ADD_EMAIL_GROUP,
    DELETE_EMAIL_GROUP,
    REGUSER_SUCCESS,
    REGUSER_FAILURE, CHANGE_EMAIL_AUTH_FLAG, CHANGE_EMAIL_AUTH_GROUP_FLAG,
} from "../actions/regUserActions";

const initialState = {
    userId: '',
    password: '',
    username: '',
    cellPhone: '',
    email: '',
    level: '',
    emailAuthValue: "",
    emailAuthFlag: false,
    emailAuthGroupFlag: false,
    emailAuthGroupList: [],
    msg: null,
    msgError: null,
};

const regUserReducer = handleActions(
    {
        [INITIALIZE]: () => ({
            initialState,
        }),
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => produce(state, (draft) => {
                    draft[key] = value;
        }),
        [ADD_EMAIL_GROUP]: (state, {payload: emailAuthGroupList}) => ({
            ...state,
            emailAuthGroupList,
        }),
        [DELETE_EMAIL_GROUP]: (state, {payload: emailAuthGroupList}) => ({
            ...state,
            emailAuthGroupList,
        }),
        [REGUSER_SUCCESS]: (state, { payload: msg }) => ({
            ...state,
            msg,
            msgError: null,
        }),
        [REGUSER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            msgError: error,
        }),
        [CHANGE_EMAIL_AUTH_FLAG]: state => produce(state, (draft) => {
            draft.emailAuthFlag = !draft.emailAuthFlag;
        }),
        [CHANGE_EMAIL_AUTH_GROUP_FLAG]: state => produce(state, (draft) => {
            draft.emailAuthGroupFlag = !draft.emailAuthGroupFlag;
        }),
    },
    initialState,
);

export default regUserReducer;
