import {handleActions} from "redux-actions";
import {
    SET_LOGIN_USER,
    CHECK_LOGIN_USER_SUCCESS,
    CHECK_LOGIN_USER_FAILURE, LOGOUT,
} from "../actions/accountActions";

const initialState = {
    user: null,
    checkError: null,
};

export default handleActions(
    {
        [SET_LOGIN_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_LOGIN_USER_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user: user.user.User,
            checkError: null,
        }),
        [CHECK_LOGIN_USER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        }),
    },
    initialState,
);
