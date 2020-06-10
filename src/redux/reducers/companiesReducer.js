import {List, Map} from "immutable";
import {handleActions} from "redux-actions";
import {
    COMPANYLIST_SUCCESS,
} from "../actions/companiesActions";

const initialState = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0,
        rows: 0,
        offset: 0,
    },
};

const companiesReducer = handleActions(
    {
        [COMPANYLIST_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
    },
    initialState,
);

export default companiesReducer;
