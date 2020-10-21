import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoginInputEmailFormWrap from "./LoginInputEmailForm";
import {
    GV_LOGIN_PAGE_INPUT_EMAIL,
    GV_LOGIN_PAGE_CONFIRM_EMAIL,
    OPERATOR, UNREGISTERED_USER, TOP_MANAGER, NORMAL_USER,
} from "../../../../lib/var/globalVariable";
import {checkLoginUser, logout} from "../../../../redux/actions/loginActions";
import LoginConfirmEmailForm from "./LoginConfirmEmailForm";
import LoginForm from "./LoginForm";
import ImageCBLogo from '../../../../shared/img/logo/cb_logo_light.png';

const LoginBase = ({history}) => {
    const dispatch = useDispatch();
    const {
        pageNum,
        user,
    } = useSelector(({accountRd}) => ({
        pageNum: accountRd.pageNum,
        user: accountRd.user,
    }));
    const {
        hybridCloud,
    } = useSelector(({customizer}) => ({
        hybridCloud: customizer.hybridCloud,
    }));

    useEffect(() => {
        if (user) {
            /********************************************************************
             * 로그인 성공!
             ********************************************************************/
            console.log('useEffect: check API 성공 Level : ', user);
            if (hybridCloud) {
                if (user.level === NORMAL_USER) {
                    history.push('/micro/vmsCard');
                } else if (user.level >= TOP_MANAGER) {
                    history.push('/micro/dashboard');
                }
            } else if (user.level <= OPERATOR) {
                history.push('/dashboards/manager');
            } else {
                history.push('/dashboards/customer');
            }
            /** Insert 'user' to Local Storage */
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        console.log("LoginBase: init pageNum ", pageNum);
        dispatch(checkLoginUser());
    }, []);

    console.log("LoginBase: current pageNum ", pageNum);
    return (
        <div className="account__wrapper">
            {/*<div className="account__logo-area">
                <img className="account__logo-img" src={ImageCBLogo} alt="Contents Bridge"/>
            </div>*/}
            <div className="account__card">
                <div className="account__head">
                    <h3 className="account__title" style={{
                        color: "white",
                    }}>Welcome to
                        <span className="account__logo"> Nubes Bridge</span>
                    </h3>
                    <h4 className="account__subhead subhead">통합플랫폼</h4>
                </div>
                {/* eslint-disable-next-line no-nested-ternary */}
                {pageNum === GV_LOGIN_PAGE_INPUT_EMAIL ? <LoginInputEmailFormWrap form="log_in_email_input_form"/>
                    : (pageNum === GV_LOGIN_PAGE_CONFIRM_EMAIL ? <LoginConfirmEmailForm form="log_in_confirm_form"/>
                        : <LoginForm form="log_in_form"/>)
                }
            </div>
        </div>
    );
};

export default LoginBase;
