import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LoginEmailAuthForm = ({ id, secret }) => {
    const userId = id;
    const userSecret = secret;
    const sendEmailAuth = async () => {
        console.log('sendEmailAuth:', userId);
        console.log('sendEmailAuth:', userSecret);
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8081/api/auth/email_confirm',
                data: {
                    id: userId,
                    secret: userSecret,
                },
            });
        } catch (err) {
            console.log('axios error:', err);
        }
    };

    useEffect(() => {
        console.log("email auth:...");
        sendEmailAuth();
    });

    return (
        <Form className="form login-form">
            <div className="form__form-group">
                <span className="form__form-group-label">인증되었습니다.</span>
            </div>
        </Form>
    );
};

const LoginEmailAuthFormWrap = withRouter(reduxForm()(LoginEmailAuthForm));
export default LoginEmailAuthFormWrap;
