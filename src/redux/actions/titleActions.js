export const CHANGE_TITLE = 'CHANGE_TITLE';
/*
export const CHANGE_ACCETS = 'CHANGE_ACCETS';
export const CHANGE_MEMBER_CUSTOMER = 'CHANGE_MEMBER_CUSTOMER';
*/

export function changeMenuTitle(title, subTitle) {
    return {
        type: CHANGE_TITLE, // action의 형태를 지정함
        menuTitle: {title, subTitle},
    };
}
