import {handleActions} from "redux-actions";
import {
    PAGING_CHANGE_CURRENT_PAGE,
    PAGING_CHANGE_ROWS_PER_PAGE,
    PAGING_CHANGE_TOTAL_COUNT, PAGING_CHANGE_TOTAL_PAGE,
    PAGING_SETUP,
} from "../actions/pagingActions";

const initialState = {
    rowsPerPage: 10,
    currentPage: 1,
    totalPage: 1,
    totalCount: 1,
    displayRowsList: [10, 20, 30, 50, 100],
};

const pagingReducer = handleActions(
    {
        [PAGING_SETUP]: (state, {payload}) => ({
            rowsPerPage: payload.rowsPerPage,
            currentPage: payload.currentPage,
            totalPage: payload.totalPage,
            totalCount: payload.totalCount,
        }),
        [PAGING_CHANGE_CURRENT_PAGE]: (state, {payload: currentPage}) => ({
            ...state,
            currentPage,
        }),
        [PAGING_CHANGE_ROWS_PER_PAGE]: (state, action) => ({
            ...state,
            rowsPerPage: action.payload.rowsPerPage,
        }),
        [PAGING_CHANGE_TOTAL_COUNT]: (state, action) => ({
            ...state,
            totalCount: action.payload.totalCount,
        }),
        [PAGING_CHANGE_TOTAL_PAGE]: (state, action) => ({
            ...state,
            totalPage: action.payload.totalPage,
        }),
    },
    initialState,
);

export default pagingReducer;
