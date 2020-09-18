import {createAction} from "redux-actions";

export const INITIALIZE_MC_PAGE = "micro/CHANGE_MC_PAGE";
export const CHANGE_MC_PAGE = "micro/CHANGE_MC_PAGE";

export const changeMcPage = createAction(CHANGE_MC_PAGE, ({pageType, data}) => ({
    pageType,
    data,
}));
export const initMcPage = createAction(INITIALIZE_MC_PAGE);
