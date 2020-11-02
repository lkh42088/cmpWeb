import outlineDashboard from "@iconify/icons-ic/outline-dashboard";
import serverOutlineBadged from "@iconify/icons-clarity/server-outline-badged";
import routerNetwork from "@iconify/icons-mdi/router-network";
import thList from "@iconify/icons-fa-solid/th-list";
import gridChartSolid from "@iconify/icons-clarity/grid-chart-solid";
import monitorMultiple from "@iconify/icons-mdi/monitor-multiple";
import outlineRestore from "@iconify/icons-ic/outline-restore";
import backupRestore from "@iconify/icons-mdi/backup-restore";
import fileInvoiceDollar from "@iconify/icons-fa-solid/file-invoice-dollar";
import listAlt from "@iconify/icons-el/list-alt";
import usersIcon from "@iconify/icons-fa-solid/users";
import monitorDashboard from "@iconify/icons-mdi/monitor-dashboard";
import cloudServerOutlined from "@iconify/icons-ant-design/cloud-server-outlined";
import {OPERATOR, SEPARATION_URL} from "./var/globalVariable";

const COMMON_USER_URL = {
    "dashboards/manager": {title: "관리자 대시보드", subTitle: null, icon: outlineDashboard},
    "dashboards/customer": {title: "사용자 대시보드", subTitle: null, icon: outlineDashboard},
    "micro/dashboard": {title: "사용자 대시보드", subTitle: null, icon: null},
    "micro/servers": {title: "SERVER", subTitle: null, icon: serverOutlineBadged},
    "micro/networks": {title: "NETWORK", subTitle: null, icon: routerNetwork},
    "micro/images": {title: "IMAGE", subTitle: null, icon: null},
    "micro/vms": {title: "VM INVENTORY", subTitle: null, icon: thList},
    "micro/vmsCard": {title: "VM CARD", subTitle: null, icon: gridChartSolid},
    "micro/vmsPage": {title: "VM VNC", subTitle: null, icon: monitorMultiple},
    "micro/vnc": {title: "VM VNC", subTitle: null, icon: monitorMultiple},
    "micro/snapshot": {title: "SNAPSHOT", subTitle: null, icon: outlineRestore},
    "micro/backup": {title: "BACKUP", subTitle: null, icon: backupRestore},
    "assets/server": {title: "SERVER", subTitle: "온프레미스", icon: serverOutlineBadged},
    "assets/network": {title: "NETWORK", subTitle: "네트워크", icon: routerNetwork},
    "assets/part": {title: "NETWORK", subTitle: "파트 & 기타", icon: routerNetwork},
    billing: {title: "BILLING", subTitle: "", icon: fileInvoiceDollar},
    board: {title: "BOARD", subTitle: "", icon: listAlt},
    "customers/users": {title: "MANAGER", subTitle: "계정 관리", icon: usersIcon},
    "customers/companies": {title: "MANAGER", subTitle: "고객사 관리", icon: usersIcon},
    subnet: {title: "MANAGER", subTitle: "서브넷 관리", icon: usersIcon},
    setting: {title: "SETTING", subTitle: "", icon: monitorDashboard},
};

const COMMON_MANAGER_URL = {
    "dashboards/manager": {title: "관리자 대시보드", subTitle: null, icon: outlineDashboard},
    "dashboards/customer": {title: "사용자 대시보드", subTitle: null, icon: outlineDashboard},
    "micro/dashboard": {title: "HYBRID CLOUD", subTitle: "DASHBOARD", icon: cloudServerOutlined},
    "micro/servers": {title: "HYBRID CLOUD", subTitle: "SERVER", icon: cloudServerOutlined},
    "micro/networks": {title: "HYBRID CLOUD", subTitle: "NETWORK", icon: cloudServerOutlined},
    "micro/images": {title: "HYBRID CLOUD", subTitle: "IMAGE", icon: cloudServerOutlined},
    "micro/vms": {title: "HYBRID CLOUD", subTitle: "VM", icon: cloudServerOutlined},
    "micro/vmsCard": {title: "HYBRID CLOUD", subTitle: "VM CARD", icon: cloudServerOutlined},
    "micro/vmsPage": {title: "HYBRID CLOUD", subTitle: "VM VNC", icon: cloudServerOutlined},
    "micro/vnc": {title: "HYBRID CLOUD", subTitle: "VNC", icon: cloudServerOutlined},
    "micro/snapshot": {title: "HYBRID CLOUD", subTitle: "SNAPSHOT", icon: cloudServerOutlined},
    "micro/backup": {title: "HYBRID CLOUD", subTitle: "BACKUP", icon: cloudServerOutlined},
    "assets/server": {title: "SERVER", subTitle: "온프레미스", icon: serverOutlineBadged},
    "assets/network": {title: "NETWORK", subTitle: "네트워크", icon: routerNetwork},
    "assets/part": {title: "NETWORK", subTitle: "파트 & 기타", icon: routerNetwork},
    billing: {title: "BILLING", subTitle: "", icon: fileInvoiceDollar},
    board: {title: "BOARD", subTitle: "", icon: listAlt},
    "customers/users": {title: "MANAGER", subTitle: "계정 관리", icon: usersIcon},
    "customers/companies": {title: "MANAGER", subTitle: "고객사 관리", icon: usersIcon},
    subnet: {title: "MANAGER", subTitle: "서브넷 관리", icon: usersIcon},
    setting: {title: "SETTING", subTitle: "", icon: monitorDashboard},
};

// eslint-disable-next-line import/prefer-default-export
export function setIgnoredYellowBox() {
    console.ignoredYellowBox = [
        'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    ];
}

const user = JSON.parse(localStorage.getItem("user"));
let PAGE_URL = '';
if (user) {
    PAGE_URL = (user.level <= OPERATOR ? COMMON_MANAGER_URL : COMMON_USER_URL);
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

/** ----------------------------------------------------start **/


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

export const sidebarSeperateUrl = (tmpUrl) => {
    let tmp = tmpUrl;
    tmp = tmp.replace(SEPARATION_URL, "");
    if (tmp && tmp.length > 1 && PAGE_URL[tmp]) {
        return tmp;
    }
    return null;
};

export const sidebarGetTitle = (tmpUrl) => {
    const tmp = sidebarSeperateUrl(tmpUrl);
    if (tmp) {
        const pageTitle = PAGE_URL[tmp].title;
        return pageTitle;
    }
    return null;
};

export const sidebarGetSubTitle = (tmpUrl) => {
    const tmp = sidebarSeperateUrl(tmpUrl);
    if (tmp) {
        const pageTitle = PAGE_URL[tmp].subTitle;
        return pageTitle;
    }
    return null;
};
/** -----------------------------------------------------end **/
