import {handleActions} from "redux-actions";
import {CHANGE_VM_PAGE, INITIALIZE_VM_PAGE} from "../actions/vmsActions";

const initialState = {
    pageType: 'list',
    data: null,
};

const vmsReducer = handleActions(
    {
        [INITIALIZE_VM_PAGE]: state => ({
            pageType: 'list',
            data: null,
        }),
        [CHANGE_VM_PAGE]: (state, {payload: {pageType, data}}) => ({
            pageType,
            data,
        }),
    },
    initialState,
);

export default vmsReducer;
