
/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
import {createAction} from "redux-actions";

export const PAGING_SETUP = 'paging/PAGING_SETUP';
export const PAGING_CHANGE_CURRENT_PAGE_PREV = 'paging/PAGING_CHANGE_CURRENT_PAGE_PREV';
export const PAGING_CHANGE_CURRENT_PAGE_NEXT = 'paging/PAGING_CHANGE_CURRENT_PAGE_NEXT';
export const PAGING_CHANGE_ROWS_PER_PAGE = 'paging/PAGING_CHANGE_ROWS_PER_PAGE';
export const PAGING_CHANGE_TOTAL_COUNT = 'paging/PAGING_CHANGE_TOTAL_COUNT';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const pagingSetup = createAction(PAGING_SETUP,
    ({
         rowsPerPage, currentPage, totalPage, totalCount,
    }) => ({
        rowsPerPage, currentPage, totalPage, totalCount,
    }));
export const pagingChangeCurrentPagePrev = createAction(PAGING_CHANGE_CURRENT_PAGE_PREV);
export const pagingChangeCurrentPageNext = createAction(PAGING_CHANGE_CURRENT_PAGE_NEXT);
export const pagingChangeRowsPerPage = createAction(PAGING_CHANGE_ROWS_PER_PAGE,
    rowsPerPage => rowsPerPage);
export const pagingChangeTotalCount = createAction(PAGING_CHANGE_TOTAL_COUNT,
    totalCount => totalCount);
