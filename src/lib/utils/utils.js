
/***
 * 패스워드 조건
 * - 영문자, 숫자, 특수문자 포함
 * - 8~16 문자
 */
// eslint-disable-next-line import/prefer-default-export
export function checkPasswordPattern(pass) {
    let message = "";

    // 비밀번호 문자열에 숫자 존재 여부 검사
    const pattern1 = /[0-9]/; // 숫자
    if (pattern1.test(pass) === false) {
        message = "* 비밀번호에 숫자가 입력되지 않았습니다!";
    }

    // 비밀번호 문자열에 영문 소문자 존재 여부 검사
    const pattern2 = /[a-z]/;
    if (pattern2.test(pass) === false) {
        message = "* 비밀번호에 영문 소문자가 입력되지 않았습니다!";
    }

    // 비밀번호 문자열에 영문 대문자 존재 여부 검사
    // const pattern3 = /[A-Z]/;
    // if (pattern3.test(pass) === false) {
    //     message = "비밀번호에 영문 대문자가 입력되지 않았습니다.\n영문 대문자를 입력하여 주시기 바랍니다.";
    // }

    // 비밀번호 문자열에 특수문자 존재 여부 검사
    const pattern4 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    if (pattern4.test(pass) === false) {
        message = "* 비밀번호에 특수문자가 입력되지 않았습니다!";
    }

    // 비밀번호 문자열의 입력 길이 검사
    if (pass.length < 8 || pass.length > 16) {
        message = "* 비밀번호는 8자리 이상 16자리 이하만 가능합니다!";
    }

    return message;
}

export const checkId = (arg) => {
    // eslint-disable-next-line no-useless-escape
    const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    } else if (arg.length < 4 || arg.length > 15) {
        error = "* 4자 이상 15이하로 입력하십시오.";
    } else if (specialCheck.test(arg)) {
        error = "* 특수문자는 포함 될수 없습니다.";
    } else if (arg.search(/\s/) !== -1) {
        error = "* ID에 빈 칸은 포함 될 수 없습니다.";
    }

    return error;
};

export const checkCompanyName = (arg) => {
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    } else if (arg.length < 2 || arg.length > 15) {
        error = "* 2자 이상 15이하로 입력하십시오.";
    }
    return error;
};

// eslint-disable-next-line no-useless-escape
const emailPattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
export const checkEmail = (arg) => {
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    } else if (!emailPattern.test(arg)) {
        error = "* 이메일을 올바르게 입력하십시오.";
    }
    return error;
};

export const checkZipCode = (arg) => {
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    }
    return error;
};

export const checkAddress = (arg) => {
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    }
    return error;
};

const telPattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
export const checkTelephone = (arg) => {
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    }
    // else if (!telPattern.test(arg)) {
    //     error = "* 전화번호를 올바르게 입력하십시오.";
    // }
    return error;
};

const cpPattern = /^\d{3}-\d{3,4}-\d{4}$/;
export const checkCellphone = (arg) => {
    let error = "";
    arg = arg.trim();
    if (arg.length < 1) {
        error = "* 필수 입력사항입니다.";
    }
    // else if (!cpPattern.test(arg)) {
    //     error = "* 핸드폰 번호를 올바르게 입력하십시오.";
    // }
    return error;
};
