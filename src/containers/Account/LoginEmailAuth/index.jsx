import React from 'react';
import LoginEmailAuthFormWrap from "./components/LoginEmailAuth";

const LogInEmailAuth = ({ match }) => {
    const { id } = match.params;
    const { target } = match.params;
    const { secret } = match.params;
    // console.log("LogIN - secret:", secret === undefined);
    return (
        <div className="account account--not-photo">
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
                    <LoginEmailAuthFormWrap id={id} target={target} secret={secret} form="log_in_form" />
                </div>
            </div>
        </div>
    );
};

export default LogInEmailAuth;
