
/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
import {createAction} from "redux-actions";

export const PAGING_SETUP = 'paging/PAGING_SETUP';
export const PAGING_CHANGE_CURRENT_PAGE = 'paging/PAGING_CHANGE_CURRENT_PAGE';
export const PAGING_CHANGE_ROWS_PER_PAGE = 'paging/PAGING_CHANGE_ROWS_PER_PAGE';
export const PAGING_CHANGE_TOTAL_COUNT = 'paging/PAGING_CHANGE_TOTAL_COUNT';
export const PAGING_CHANGE_TOTAL_PAGE = 'paging/PAGING_CHANGE_TOTAL_PAGE';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const pagingSetup = createAction(PAGING_SETUP,
    ({
         rowsPerPage, currentPage, totalPage, totalCount,
    }) => ({
        rowsPerPage, currentPage, totalPage, totalCount,
    }));
export const pagingChangeCurrentPage = createAction(PAGING_CHANGE_CURRENT_PAGE,
    currentPage => currentPage);
export const pagingChangeRowsPerPage = createAction(PAGING_CHANGE_ROWS_PER_PAGE,
    rowsPerPage => rowsPerPage);
export const pagingChangeTotalCount = createAction(PAGING_CHANGE_TOTAL_COUNT,
    totalCount => totalCount);
export const pagingChangeTotalPage = createAction(PAGING_CHANGE_TOTAL_PAGE,
    totalPage => totalPage);
