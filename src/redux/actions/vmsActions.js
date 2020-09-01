import {createAction} from "redux-actions";

export const INITIALIZE_VM_PAGE = "vm/CHANGE_VM_PAGE";
export const CHANGE_VM_PAGE = "vm/CHANGE_VM_PAGE";

export const changeVmPage = createAction(CHANGE_VM_PAGE, ({pageType, data}) => ({pageType, data}));
export const initVmPage = createAction(INITIALIZE_VM_PAGE);
