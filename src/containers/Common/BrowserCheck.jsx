import {SEPARATION_URL} from "../../lib/var/commonVariables";

export const IsChrome = window.navigator.userAgent.indexOf("Chrome") > -1;
export const IsFirefox = window.navigator.userAgent.indexOf("Firefox") > -1;
export const IsSafari = window.navigator.userAgent.indexOf("Safari") > -1;

export const CheckIE = () => {
    let isIE = false;
    if (/MSIE 10/i.test(navigator.userAgent)) {
        // This is internet Explorer 10
        isIE = true;
    }

    if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        // This is internet Explorer 9 or 11
        isIE = true;
    }

    return isIE;
};

export const ChromeLaunch = () => {
    const chromeFile = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
    const chromeExe = chromeFile.concat(" ").concat(SEPARATION_URL);
    const shell = new window.ActiveXObject("WScript.Shell");

    /** Chrome browser check */
    const fso = new window.ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(chromeFile)) {
        // eslint-disable-next-line
        alert("Chrome 브라우저가 설치되어 있지 않습니다.");
        return;
    }

    /** IE close */
    window.opener = this;
    const w = window.open('', "_self", "");
    w.close();

    /** Chrome open */
    shell.exec(chromeExe);
};

const EdgeLaunch = () => {
    const edgeFile = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
    const edgeExe = edgeFile.concat(" ").concat(SEPARATION_URL);
    const shell = new window.ActiveXObject("WScript.Shell");

    /** Chrome browser check */
    const fso = new window.ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(edgeFile)) {
        // eslint-disable-next-line
        alert("Edge 브라우저가 설치되어 있지 않습니다.");
        ChromeLaunch();
    }

    /** IE close */
    window.opener = this;
    const w = window.open('', "_self", "");
    w.close();

    /** Chrome open */
    shell.exec(edgeExe);
};

export default EdgeLaunch;
