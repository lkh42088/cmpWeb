import {handleActions} from "redux-actions";
import {CHANGE_MC_PAGE, INITIALIZE_MC_PAGE} from "../actions/microActions";

const initialState = {
    pageType: 'list',
    data: null,
    server: {},
};

const microReducer = handleActions(
    {
        [INITIALIZE_MC_PAGE]: state => ({
            pageType: 'list',
            data: null,
            server: {},
        }),
        [CHANGE_MC_PAGE]: (state, {payload: {pageType, data}}) => ({
            pageType,
            data,
        }),
    },
    initialState,
);

export default microReducer;
