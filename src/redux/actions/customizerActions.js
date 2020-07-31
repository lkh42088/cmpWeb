export const CHANGE_BORDER_RADIUS = 'CHANGE_BORDER_RADIUS';
export const TOGGLE_BOX_SHADOW = 'TOGGLE_BOX_SHADOW';
export const TOGGLE_TOP_NAVIGATION = 'TOGGLE_TOP_NAVIGATION';
export const TOGGLE_SIDEBAR_DROPDOWN = 'TOGGLE_SIDEBAR_DROPDOWN';
export const TOGGLE_DENSE_PADDING = 'TOGGLE_DENSE_PADDING';
export const TOGGLE_HYBRID_CLOUD = 'TOGGLE_HYBRID_CLOUD';
export const ENABLE_LOG_NORMAL = 'ENABLE_LOG_NORMAL';
export const ENABLE_LOG_DETAIL = 'ENABLE_LOG_DETAIL';

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

export function changeDensePadding() {
  return {
    type: TOGGLE_DENSE_PADDING,
  };
}

export function toggleHybridCloud() {
  return {
    type: TOGGLE_HYBRID_CLOUD,
  };
}

export function enableLogNormal() {
  return {
    type: ENABLE_LOG_NORMAL,
  };
}

export function enableLogDetail() {
  return {
    type: ENABLE_LOG_DETAIL,
  };
}
