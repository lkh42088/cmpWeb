import React from 'react';
import LoginFormWrap from "./LoginForm";

const LoginCard = () => {
    console.log('test:LoginCard');
    return (
        <div className="account__wrapper">
            <div className="account__card">
                <div className="account__head">
                    <h3 className="account__title">Welcome to
                        <span className="account__logo"> Contents
                            <span className="account__logo-accent"> Bridge</span>
                        </span>
                    </h3>
                    <h4 className="account__subhead subhead">통합플랫폼</h4>
                </div>
                <LoginFormWrap onSubmin form="log_in_form" />
            </div>
        </div>
    );
};

export default LoginCard;
