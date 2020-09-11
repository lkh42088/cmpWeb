import {SEPARATION_URL} from "./var/globalVariable";

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

export function formatBytes(bytes, formatType) {
    const marker = 1024; // Change to 1000 if required
    const decimal = 2; // Change as required
    const kiloBytes = marker; // One Kilobyte is 1024 bytes
    const megaBytes = marker * marker; // One MB is 1024 KB
    const gigaBytes = marker * marker * marker; // One GB is 1024 MB
    const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB
    let returnVal = 0;

    /*// return bytes if less than a KB
    if(bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return(bytes / gigaBytes).toFixed(decimal) + " GB";*/

    switch (formatType) {
        case "KB":
            returnVal = (bytes / kiloBytes).toFixed(decimal);
            break;
        case "MB":
            returnVal = (bytes / megaBytes).toFixed(decimal);
            break;
        case "GB":
            returnVal = (bytes / gigaBytes).toFixed(decimal);
            break;
        default:
            break;
    }

    return returnVal;
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
