/**
 * Contents Bridge Company
 * Created Date: 2020-06-06
 * Author: Byeong-Hwa Jung
 * E-mail: bhjung@nubes-bridge.com
 */

/******************************************************************************
 * 1. Action Type
 *****************************************************************************/
import {createAction} from "redux-actions";

export const PAGING_SUB_SETUP = 'paging/PAGING_SUB_SETUP';
export const PAGING_SUB_DUMP = 'paging/PAGING_SUB_DUMP';
export const PAGING_SUB_SET_LOG = 'paging/PAGING_SUB_SET_LOG';

export const PAGING_SUB_CHANGE_CURRENT_PAGE_PREV = 'paging/PAGING_SUB_CHANGE_CURRENT_PAGE_PREV';
export const PAGING_SUB_CHANGE_CURRENT_PAGE_NEXT = 'paging/PAGING_SUB_CHANGE_CURRENT_PAGE_NEXT';
export const PAGING_SUB_CHANGE_CURRENT_PAGE = 'paging/PAGING_SUB_CHANGE_CURRENT_PAGE';
export const PAGING_SUB_CHANGE_ROWS_PER_PAGE = 'paging/PAGING_SUB_CHANGE_ROWS_PER_PAGE';
export const PAGING_SUB_CHANGE_TOTAL_COUNT = 'paging/PAGING_SUB_CHANGE_TOTAL_COUNT';
export const PAGING_SUB_CHANGE_SELECTED = 'paging/PAGING_SUB_CHANGE_SELECTED';
export const PAGING_SUB_CHANGE_DENSE = 'paging/PAGING_SUB_CHANGE_DENSE';
export const PAGING_SUB_CHANGE_ORDER_BY = 'paging/PAGING_SUB_CHANGE_ORDER_BY';
export const PAGING_SUB_CHANGE_ORDER_BY_WITH_RESET = 'paging/PAGING_SUB_CHANGE_ORDER_BY_WITH_RESET';
export const PAGING_SUB_CHANGE_ORDER = 'paging/PAGING_SUB_CHANGE_ORDER';
export const PAGING_SUB_CHANGE_ORDER_AND_ORDERBY = 'paging/PAGING_SUB_CHANGE_ORDER_AND_ORDERBY';

/******************************************************************************
 * 2. Action Function
 *****************************************************************************/
export const pagingSetup = createAction(PAGING_SUB_SETUP,
    ({
         rowsPerPage, currentPage, totalPage, totalCount,
     }) => ({
        rowsPerPage, currentPage, totalPage, totalCount,
    }));
export const pagingDump = createAction(PAGING_SUB_DUMP);
export const pagingSetLog = createAction(PAGING_SUB_SET_LOG, ({enableLog}) => ({enableLog}));
export const pagingChangeCurrentPagePrev = createAction(PAGING_SUB_CHANGE_CURRENT_PAGE_PREV);
export const pagingChangeCurrentPageNext = createAction(PAGING_SUB_CHANGE_CURRENT_PAGE_NEXT);
export const pagingChangeCurrentPage = createAction(PAGING_SUB_CHANGE_CURRENT_PAGE,
    currentPage => currentPage);
export const pagingChangeRowsPerPage = createAction(PAGING_SUB_CHANGE_ROWS_PER_PAGE,
    rowsPerPage => rowsPerPage);
export const pagingChangeTotalCount = createAction(PAGING_SUB_CHANGE_TOTAL_COUNT,
    totalCount => totalCount);
export const pagingChangeSelected = createAction(PAGING_SUB_CHANGE_SELECTED,
    selected => selected);
export const pagingChangeDense = createAction(PAGING_SUB_CHANGE_DENSE,
    checked => checked);
export const pagingChangeOrderBy = createAction(PAGING_SUB_CHANGE_ORDER_BY,
    orderBy => orderBy);
export const pagingChangeOrderByWithReset = createAction(PAGING_SUB_CHANGE_ORDER_BY_WITH_RESET,
    orderBy => orderBy);
export const pagingChangeOrder = createAction(PAGING_SUB_CHANGE_ORDER,
    order => order);
export const pagingChangeSorting = createAction(PAGING_SUB_CHANGE_ORDER_AND_ORDERBY,
    ({order, orderBy}) => ({order, orderBy}));
