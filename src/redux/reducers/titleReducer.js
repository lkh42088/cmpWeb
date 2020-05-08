import {
    CHANGE_TITLE,
} from '../actions/titleActions';

const initialState = {
    title: '자산관리',
    subTitle: '서버',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_TITLE:
            return {title: action.menuTitle.title, subTitle: action.menuTitle.subTitle};
        case 'CHANGE_ERROR':
            return {title: action.menuTitle.title, subTitle: action.menuTitle.subTitle};
        default:
            return state;
    }
}
