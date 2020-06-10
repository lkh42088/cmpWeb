/**
 * Contents Bridge Company
 * Created Date: 2020-06-06
 * Author: Byeong-Hwa Jung
 * E-mail: bhjung@nubes-bridge.com
 */

import {handleActions} from "redux-actions";
import {
    PAGING_CHANGE_CURRENT_PAGE,
    PAGING_CHANGE_CURRENT_PAGE_NEXT,
    PAGING_CHANGE_CURRENT_PAGE_PREV,
    PAGING_CHANGE_DENSE,
    PAGING_CHANGE_ORDER, PAGING_CHANGE_ORDER_BY,
    PAGING_CHANGE_ROWS_PER_PAGE,
    PAGING_CHANGE_SELECTED,
    PAGING_CHANGE_TOTAL_COUNT,
    PAGING_DUMP,
    PAGING_SETUP,
} from "../actions/pagingActions";

const initialState = {
    rowsPerPage: 10,
    currentPage: 0,
    totalPage: 1,
    totalCount: 1,
    pageBeginRow: 0,
    pageEndRow: 10,
    displayRowsList: [10, 20, 30, 50, 100],
    selected: new Map([]),
    dense: false,
    orderBy: '',
    order: 'asc',
};

const pagingReducer = handleActions(
    {
        [PAGING_DUMP]: (state) => {
            console.log("[pagination dump]-------------");
            console.log("rowsPerPage:", state.rowsPerPage);
            console.log("currentPage:", state.currentPage);
            console.log("totalPage:", state.totalPage);
            console.log("totalCount:", state.totalCount);
            console.log("pageBeginRow:", state.pageBeginRow);
            console.log("pageEndRow:", state.pageEndRow);
            console.log("selected:", state.selected);
            console.log("dense:", state.dense);
            console.log("orderBy:", state.orderBy);
            console.log("order:", state.order);
            return {
                ...state,
            };
        },
        [PAGING_SETUP]: (state, {payload}) => ({
            rowsPerPage: payload.rowsPerPage,
            currentPage: payload.currentPage,
            totalPage: payload.totalPage,
            totalCount: payload.totalCount,
        }),
        [PAGING_CHANGE_CURRENT_PAGE_PREV]: state => ({
            ...state,
            currentPage: (
                (state.currentPage > 0)
                    ? (state.currentPage - 1) : state.currentPage
            ),
            pageBeginRow: (
                (state.currentPage > 0)
                    ? (state.pageBeginRow - state.rowsPerPage) : state.pageBeginRow
            ),
            pageEndRow: (
                (state.currentPage > 0)
                    ? (state.pageEndRow - state.rowsPerPage) : state.pageEndRow
            ),
            selected: new Map([]),
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
            selected: new Map([]),
        }),
        [PAGING_CHANGE_CURRENT_PAGE]: (state, action) => {
            const pageNum = action.payload.currentPage;
            if (state.currentPage === pageNum) {
                return {
                    ...state,
                };
            }
            let beginRow;
            let endRow;
            if (pageNum === 0) {
                beginRow = 0;
                endRow = state.rowsPerPage;
            } else {
                beginRow = state.rowsPerPage * pageNum;
                endRow = state.rowsPerPage * (pageNum + 1);
            }
            return {
                ...state,
                selected: new Map([]),
                currentPage: pageNum,
                pageBeginRow: beginRow,
                pageEndRow: endRow,
            };
        },
        [PAGING_CHANGE_ROWS_PER_PAGE]: (state, action) => ({
            ...state,
            rowsPerPage: action.payload.rowsPerPage,
            currentPage: 0,
            totalPage: (
                (action.payload.totalCount === 0 || state.rowsPerPage === 0)
                    ? 1 : Math.ceil(state.totalCount / action.payload.rowsPerPage)
            ),
            pageBeginRow: 0,
            pageEndRow: action.payload.rowsPerPage,
            selected: new Map([]),
        }),
        [PAGING_CHANGE_TOTAL_COUNT]: (state, action) => ({
            ...state,
            totalCount: action.payload.totalCount,
            totalPage: (
                (action.payload.totalCount === 0 || state.rowsPerPage === 0)
                    ? 1 : Math.ceil(action.payload.totalCount / state.rowsPerPage)
            ),
            currentPage: 0,
            pageBeginRow: 0,
            pageEndRow: state.rowsPerPage,
            selected: new Map([]),
        }),
        [PAGING_CHANGE_SELECTED]: (state, action) => ({
            ...state,
            selected: action.payload.selected,
        }),
        [PAGING_CHANGE_DENSE]: (state, action) => ({
            ...state,
            dense: action.payload.checked,
        }),
        [PAGING_CHANGE_ORDER_BY]: (state, action) => ({
            ...state,
            orderBy: action.payload.orderBy,
        }),
        [PAGING_CHANGE_ORDER]: (state, action) => ({
            ...state,
            order: action.payload.order,
        }),
    },
    initialState,
);

export default pagingReducer;
