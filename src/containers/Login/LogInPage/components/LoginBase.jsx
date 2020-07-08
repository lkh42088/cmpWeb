import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoginFormWrap from "./LoginForm";
import LoginInputEmailFormWrap from "./LoginInputEmailForm";
import {
    GV_LOGIN_PAGE_INPUT_EMAIL,
    GV_LOGIN_PAGE_CONFIRM_EMAIL,
} from "../../../../lib/globalVariable";
import {checkLoginUser} from "../../../../redux/actions/accountActions";
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
        console.log('[LoginForm 2]');
        if (authError) {
            console.log('오류 발생');
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            dispatch(checkLoginUser());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        console.log('[LoginForm 3] ');
        if (user) {
            /********************************************************************
             * 로그인 성공!
             ********************************************************************/
            console.log('check API 성공');
            // eslint-disable-next-line react/prop-types
            history.push('/dashboards/manager');
            try {
                /** Insert 'user' to Local Storage */
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    useEffect(() => {
        console.log("LoginBase: init pageNum ", pageNum);
    }, []);

    useEffect(() => {
        console.log("LoginBase: change pageNum ", pageNum);
    }, [pageNum]);

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
