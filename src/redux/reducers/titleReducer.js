import {
    CHANGE_TITLE,
} from '../actions/titleActions';

const initialState = {
    title: '',
    subTitle: '서버',
};

export default function (state = initialState, action) {
/*    const localMenuTitle = {
        title: '',
        subTitle: '',
    };*/

    switch (action.type) {
        case CHANGE_TITLE:
            /*localMenuTitle.title = action.menuTitle.title;
            localMenuTitle.subTitle = action.menuTitle.subTitle;
            localStorage.localMenuTitle = JSON.stringify(localMenuTitle);
            console.log(localStorage.localMenuTitle);*/
            return {title: action.menuTitle.title, subTitle: action.menuTitle.subTitle};
        case 'CHANGE_ERROR':
            return {title: action.menuTitle.title, subTitle: action.menuTitle.subTitle};
        default:
            return state;
    }
}
