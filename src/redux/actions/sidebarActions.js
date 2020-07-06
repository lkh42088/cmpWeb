import {createAction} from "redux-actions";

export const CHANGE_SIDEBAR_VISIBILITY = 'CHANGE_SIDEBAR_VISIBILITY';
export const CHANGE_MOBILE_SIDEBAR_VISIBILITY = 'CHANGE_MOBILE_SIDEBAR_VISIBILITY';
export const CLEAR_SIDEBAR_WINDOWS = 'CLEAR_SIDEBAR_WINDOWS';

export function changeSidebarVisibility() {
  return {
    type: CHANGE_SIDEBAR_VISIBILITY,
  };
}

export function changeMobileSidebarVisibility() {
  return {
    type: CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  };
}

export const clearSidebarWindows = createAction(CLEAR_SIDEBAR_WINDOWS, ({ value }) => ({ value }));
