import {handleActions} from "redux-actions";
import {
    PAGING_CHANGE_CURRENT_PAGE_NEXT, PAGING_CHANGE_CURRENT_PAGE_PREV,
    PAGING_CHANGE_ROWS_PER_PAGE, PAGING_CHANGE_SELECTED,
    PAGING_CHANGE_TOTAL_COUNT,
    PAGING_SETUP,
} from "../actions/pagingActions";

const initialState = {
    rowsPerPage: 10,
    currentPage: 1,
    totalPage: 1,
    totalCount: 1,
    pageBeginRow: 0,
    pageEndRow: 10,
    displayRowsList: [10, 20, 30, 50, 100],
    selected: new Map([]),
};

const pagingReducer = handleActions(
    {
        [PAGING_SETUP]: (state, {payload}) => ({
            rowsPerPage: payload.rowsPerPage,
            currentPage: payload.currentPage,
            totalPage: payload.totalPage,
            totalCount: payload.totalCount,
        }),
        [PAGING_CHANGE_CURRENT_PAGE_PREV]: state => ({
            ...state,
            currentPage: (
                (state.currentPage > 1)
                    ? (state.currentPage - 1) : state.currentPage
            ),
            pageBeginRow: (
                (state.currentPage > 1)
                    ? (state.pageBeginRow - state.rowsPerPage) : state.pageBeginRow
            ),
            pageEndRow: (
                (state.currentPage > 1)
                    ? (state.pageEndRow - state.rowsPerPage) : state.pageEndRow
            ),
        }),
        [PAGING_CHANGE_CURRENT_PAGE_NEXT]: state => ({
            ...state,
            currentPage: (
                (state.currentPage >= state.totalPage)
                    ? state.currentPage : (state.currentPage + 1)
            ),
            pageBeginRow: (
                (state.currentPage >= state.totalPage)
                    ? state.pageBeginRow : (state.pageBeginRow + state.rowsPerPage)
            ),
            pageEndRow: (
                (state.currentPage >= state.totalPage)
                    ? state.pageEndRow : (state.pageEndRow + state.rowsPerPage)
            ),
        }),
        [PAGING_CHANGE_ROWS_PER_PAGE]: (state, action) => ({
            ...state,
            rowsPerPage: action.payload.rowsPerPage,
            currentPage: 1,
            totalPage: (
                (action.payload.totalCount === 0 || state.rowsPerPage === 0)
                    ? 1 : Math.ceil(state.totalCount / action.payload.rowsPerPage)
            ),
            pageBeginRow: 0,
            pageEndRow: action.payload.rowsPerPage,
        }),
        [PAGING_CHANGE_TOTAL_COUNT]: (state, action) => ({
            ...state,
            totalCount: action.payload.totalCount,
            totalPage: (
                (action.payload.totalCount === 0 || state.rowsPerPage === 0)
                    ? 1 : Math.ceil(action.payload.totalCount / state.rowsPerPage)
            ),
            currentPage: 1,
            pageBeginRow: 0,
            pageEndRow: state.rowsPerPage,
        }),
        [PAGING_CHANGE_SELECTED]: (state, action) => ({
            ...state,
            selected: action.payload.selected,
        }),
    },
    initialState,
);

export default pagingReducer;
