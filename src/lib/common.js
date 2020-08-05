import {SEPARATION_URL} from "./var/commonVariables";

// eslint-disable-next-line import/prefer-default-export
export function setIgnoredYellowBox() {
    console.ignoredYellowBox = [
        'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    ];
}

export function textDateCut(val, type) {
    let returnVal = '';
    let valArray = '';

    if (val === null || val === undefined || val === "|") {
        returnVal = '';
    } else {
        switch (type) {
            case 'warehousingDate':
                returnVal = `${val.substring(0, 4)}년${val.substring(4, 6)}월${val.substring(6, 8)}일`;
                break;
            case 'rentDate':
                valArray = val.split("|");
                returnVal = (
                    `${valArray[0].substring(0, 4)}년${valArray[0].substring(4, 6)}월${valArray[0].substring(6, 8)}일 ~ `
                );
                returnVal += `${valArray[1].substring(0, 4)}년${valArray[1].substring(4, 6)}월${valArray[1].substring(6, 8)}일`;
                break;
            default:
                break;
        }
    }

    return returnVal;
}

export function textLengthOverCut(txt, len, lastTxt) {
    if (len === "" || len === undefined) { // 기본값
        len = 20;
    }
    if (lastTxt === "" || lastTxt === undefined) { // 기본값
        lastTxt = "...";
    }
    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
}

export function textValueCut(val, compareTxt, reVal) {
    if (val === compareTxt) {
        val = reVal;
    }
    return val;
}

export function checkIP(strIP) {
    const expUrl = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
    return expUrl.test(strIP);
}
/** ----------------------------------------------------assets 에서만 사용 start **/
export function assetsSeperateUrl(tmpUrl) {
    let tmp = tmpUrl;
    tmp = tmp.replace(SEPARATION_URL, "");
    // console.log(tmpUrl, SEPARATION_URL, tmp, tmp.split("/")[1]);
    return tmp.split("/")[1];
}

export function assetsGetUrlMenu(tmpUrl) {
    const tmp = assetsSeperateUrl(tmpUrl);
    return tmp;
}
/** -----------------------------------------------------assets 에서만 사용 end **/
