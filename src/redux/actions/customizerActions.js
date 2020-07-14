export const CHANGE_BORDER_RADIUS = 'CHANGE_BORDER_RADIUS';
export const TOGGLE_BOX_SHADOW = 'TOGGLE_BOX_SHADOW';
export const TOGGLE_TOP_NAVIGATION = 'TOGGLE_TOP_NAVIGATION';
export const TOGGLE_SIDEBAR_DROPDOWN = 'TOGGLE_SIDEBAR_DROPDOWN';

export function changeBorderRadius() {
  return {
    type: CHANGE_BORDER_RADIUS,
  };
}

export function toggleBoxShadow() {
  return {
    type: TOGGLE_BOX_SHADOW,
  };
}

export function toggleTopNavigation() {
  return {
    type: TOGGLE_TOP_NAVIGATION,
  };
}

export function changeToSidebarDropdown() {
  return {
    type: TOGGLE_SIDEBAR_DROPDOWN,
  };
}
