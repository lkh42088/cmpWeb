
/***
 * 패스워드 조건
 * - 영문자, 숫자, 특수문자 포함
 * - 8~12 문자
 */
// eslint-disable-next-line import/prefer-default-export
export function checkPasswordPattern(pass) {
    let message = "";

    // 비밀번호 문자열에 숫자 존재 여부 검사
    const pattern1 = /[0-9]/; // 숫자
    if (pattern1.test(pass) === false) {
        message = "비밀번호에 숫자가 입력되지 않았습니다.\n숫자를 입력하여 주시기 바랍니다.";
    }

    // 비밀번호 문자열에 영문 소문자 존재 여부 검사
    const pattern2 = /[a-z]/;
    if (pattern2.test(pass) === false) {
        message = "비밀번호에 영문 소문자가 입력되지 않았습니다.\n영문 소문자를 입력하여 주시기 바랍니다.";
    }

    // 비밀번호 문자열에 영문 대문자 존재 여부 검사
    // const pattern3 = /[A-Z]/;
    // if (pattern3.test(pass) === false) {
    //     message = "비밀번호에 영문 대문자가 입력되지 않았습니다.\n영문 대문자를 입력하여 주시기 바랍니다.";
    // }

    // 비밀번호 문자열에 특수문자 존재 여부 검사
    // const pattern4 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    // if (pattern4.test(pass) === false) {
    //     message = "비밀번호에 특수문자가 입력되지 않았습니다.\n특수문자를 입력하여 주시기 바랍니다.";
    // }

    // 비밀번호 문자열의 입력 길이 검사
    if (pass.length < 8 || pass.length > 16) {
        message = "비밀번호는 8자리 이상 16자리 이하만 가능합니다.\n비밀번호를 다시 입력하여 주시기 바랍니다.";
    }

    // 비밀번호 문자열 결과 출력
    if (message) {
        // alert(message);
        // str.value = "";
        // str.focus();
        return false;
    }
    // alert("사용하셔도 좋은 비밀번호 입니다.");
    return true;
}
