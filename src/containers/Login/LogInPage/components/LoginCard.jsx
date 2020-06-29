import React from 'react';
import {useSelector} from "react-redux";
import LoginFormWrap from "./LoginForm";
import LoginInputEmailFormWrap from "./LoginInputEmailForm";
import LoginConfirmEmailFormWrap from "./LoginConfirmEmailForm";
import {
    GV_LOGIN_PAGE_INPUT_EMAIL,
    GV_LOGIN_PAGE_CONFIRM_EMAIL,
} from "../../../../lib/globalVariable";

const LoginCard = () => {
    const {
        pageNum,
    } = useSelector(({accountRd}) => ({
        pageNum: accountRd.pageNum,
    }));

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
                { pageNum === GV_LOGIN_PAGE_INPUT_EMAIL ? <LoginInputEmailFormWrap/>
                    : (pageNum === GV_LOGIN_PAGE_CONFIRM_EMAIL ? <LoginConfirmEmailFormWrap/>
                        : <LoginFormWrap form="log_in_form" />)
                }
            </div>
        </div>
    );
};

export default LoginCard;
