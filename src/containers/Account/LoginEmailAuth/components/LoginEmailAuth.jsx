import React, {useEffect, useState} from 'react';
import {Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import {loginEmailConfirm} from "../../../../lib/api/auth";

// eslint-disable-next-line react/prop-types
const LoginEmailAuthForm = ({ id, target, secret }) => {
    const userId = id;
    const targetId = target;
    const userSecret = secret;
    const [coments, setComents] = useState("인증되었습니다.");

    const sendEmailAuth = async () => {
        console.log('sendEmailAuth:', userId);
        console.log('sendEmailAuth:', userSecret);
        try {
            const response = await loginEmailConfirm({id: userId, target: targetId, secret: userSecret});
        } catch (err) {
            console.log('axios error:', err);
            setComents("인증이 실패하였습니다!");
        }
    };

    useEffect(() => {
        console.log("email auth:...");
        sendEmailAuth();
    });

    return (
        <Form className="form login-form">
            <div className="form__form-group">
                <span className="form__form-group-label">{coments}</span>
            </div>
        </Form>
    );
};

const LoginEmailAuthFormWrap = withRouter(reduxForm()(LoginEmailAuthForm));
export default LoginEmailAuthFormWrap;
