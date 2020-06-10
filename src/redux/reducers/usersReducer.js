import {List, Map} from "immutable";
import {handleActions} from "redux-actions";
import {
    USERLIST_SUCCESS,
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
};

const usersReducer = handleActions(
    {
        [USERLIST_SUCCESS]: (state, {payload: msg}) => ({
            ...state,
            data: msg.data,
            page: msg.page,
        }),
    },
    initialState,
);

export default usersReducer;
