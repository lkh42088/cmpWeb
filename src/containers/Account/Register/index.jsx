import React from 'react';
import { Link } from 'react-router-dom';
import RegisterFormWrap from "../../../shared/components/login/RegisterForm";

const Register = () => {
    console.log('Register index');
    return (
        <div className="account account--not-photo">
            <div className="account__wrapper">
                <div className="account__card">
                    <div className="account__head">
                        <h3 className="account__title">Welcome to
                            <span className="account__logo"> 콘텐츠
                                <span className="account__logo-accent">브릿지</span>
                            </span>
                        </h3>
                        <h4 className="account__subhead subhead">계정등록</h4>
                    </div>
                    <RegisterFormWrap/>
                    <div className="account__have-account">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
