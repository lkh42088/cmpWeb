import {
    CHANGE_BORDER_RADIUS,
    TOGGLE_BOX_SHADOW,
    TOGGLE_TOP_NAVIGATION,
    TOGGLE_SIDEBAR_DROPDOWN,
    TOGGLE_DENSE_PADDING,
    TOGGLE_HYBRID_CLOUD,
} from '../actions/customizerActions';

const initialState = {
    squaredCorners: false,
    withBoxShadow: false,
    topNavigation: false,
    sidebarDropdown: false,
    densePadding: false,
    hybridCloud: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_BORDER_RADIUS:
            return { ...state, squaredCorners: !state.squaredCorners };
        case TOGGLE_BOX_SHADOW:
            return { ...state, withBoxShadow: !state.withBoxShadow };
        case TOGGLE_TOP_NAVIGATION:
            return { ...state, topNavigation: !state.topNavigation };
        case TOGGLE_SIDEBAR_DROPDOWN:
            return { ...state, sidebarDropdown: !state.sidebarDropdown };
        case TOGGLE_DENSE_PADDING:
            return { ...state, densePadding: !state.densePadding };
        case TOGGLE_HYBRID_CLOUD:
            return { ...state, hybridCloud: !state.hybridCloud };
        default:
            return state;
    }
}
