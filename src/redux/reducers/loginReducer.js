import {handleActions} from "redux-actions";
import produce from "immer";
import {
    CHANGE_ACCOUNT_FIELD,
    INITIALIZE_FORM,
    CHECK_USER_SUCCESS,
    CHECK_USER_FAILURE,
    LOGOUT, CHANGE_LOGIN_PAGE,
} from "../actions/loginActions";
import {GV_LOGIN_PAGE_FIRST} from "../../lib/globalVariable";

const initialState = {
    pageNum: GV_LOGIN_PAGE_FIRST,
    login: {
        username: '',
        password: '',
        email: '',
    },
    user: null,
    checkError: null,
};

export default handleActions(
    {
        [INITIALIZE_FORM]: state => (
            initialState
        ),
        [CHANGE_ACCOUNT_FIELD]: (state, { payload: { key, value } }) => produce(state, (draft) => {
            draft.login[key] = value;
        }),
        [CHANGE_LOGIN_PAGE]: (state, { payload: { value } }) => ({
            ...state,
            pageNum: value,
        }),
        [CHECK_USER_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user: user.user.User,
            checkError: null,
        }),
        [CHECK_USER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => (
            initialState
        ),
    },
    initialState,
);
