import {
    CHANGE_SIDEBAR_VISIBILITY,
    CHANGE_MOBILE_SIDEBAR_VISIBILITY,
    CLEAR_SIDEBAR_WINDOWS,
} from '../actions/sidebarActions';

const initialState = {
    show: false,
    collapse: false,
    clearWindow: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_SIDEBAR_VISIBILITY:
            return { ...state, collapse: !state.collapse };
        case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
            return { ...state, show: !state.show };
        case CLEAR_SIDEBAR_WINDOWS:
            return { ...state, clearWindow: action.payload.value };
        default:
            return state;
    }
}
