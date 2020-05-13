import {handleActions} from "redux-actions";
import {
    START_LOADING,
    FINISH_LOADING,
} from "../actions/loadingActions";

export const initialState = {};

const loadingReducer = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState,
);

export default loadingReducer;
