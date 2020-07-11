import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoginFormWrap from "./LoginForm";
import LoginInputEmailFormWrap from "./LoginInputEmailForm";
import {
    GV_LOGIN_PAGE_INPUT_EMAIL,
    GV_LOGIN_PAGE_CONFIRM_EMAIL,
} from "../../../../lib/globalVariable";
import {checkLoginUser, logout} from "../../../../redux/actions/accountActions";
import LoginConfirmEmailForm from "./LoginConfirmEmailForm";

const LoginBase = ({history}) => {
    const dispatch = useDispatch();
    const {
        pageNum,
        auth,
        authError,
        user,
    } = useSelector(({accountRd}) => ({
        pageNum: accountRd.pageNum,
        auth: accountRd.auth,
        authError: accountRd.authError,
        user: accountRd.user,
    }));

    useEffect(() => {
        if (authError) {
            console.log('useEffect: 오류 발생');
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('useEffect: 로그인 성공');
            dispatch(checkLoginUser());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            /********************************************************************
             * 로그인 성공!
             ********************************************************************/
            console.log('useEffect: user', user);
            console.log('useEffect: user type ', typeof user);
            console.log('useEffect: check API 성공 Level : ', user.level);
            if (user.level >= 1 && user.level <= 5) {
                history.push('/dashboards/manager');
            } else {
                history.push('/dashboards/customer');
            }
            /** Insert 'user' to Local Storage */
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [history, user]);

    useEffect(() => {
        console.log("LoginBase: init pageNum ", pageNum);
    }, []);

    console.log("LoginBase: current pageNum ", pageNum);
    return (
        <div className="account__wrapper">
            <div className="account__card">
                <div className="account__head">
                    <h3 className="account__title">Welcome to
                        <span className="account__logo"> 콘텐츠
                            <span className="account__logo-accent"> 브릿지</span>
                        </span>
                    </h3>
                    <h4 className="account__subhead subhead">통합플랫폼</h4>
                </div>
                {/* eslint-disable-next-line no-nested-ternary */}
                { pageNum === GV_LOGIN_PAGE_INPUT_EMAIL ? <LoginInputEmailFormWrap form="log_in_email_input_form"/>
                    : (pageNum === GV_LOGIN_PAGE_CONFIRM_EMAIL ? <LoginConfirmEmailForm form="log_in_confirm_form"/>
                        : <LoginFormWrap form="log_in_form" />)
                }
            </div>
        </div>
    );
};

export default LoginBase;
