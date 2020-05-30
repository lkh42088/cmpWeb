import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import MailRuIcon from "mdi-react/MailRuIcon";
import {changeField, login, loginEmail} from "../../../../redux/actions/authActions";

// eslint-disable-next-line react/prop-types
const LoginInputEmailForm = ({ history, secret }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {
        form, authError, user, authSentEmail,
        // eslint-disable-next-line no-shadow
    } = useSelector(({ auth, user }) => ({
        form: auth.login,
        authError: auth.authError,
        user: user.user,
        authSentEmail: auth.authSentEmail,
    }));

    const onChange = (e) => {
        const { value, name } = e.target;
        console.log('name', name);
        console.log('value', value);
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('LoginInputEmail: onSubmit');
        console.log('id:', form.username);
        console.log('password:', form.password);
        console.log('email:', form.email);
        const { username, password, email } = form;
        dispatch(loginEmail({ username, password, email }));
    };

    useEffect(() => {
        console.log('[LoginForm 1]');
    }, [dispatch]);

    useEffect(() => {
        if (authSentEmail) {
            console.log("isSentEmail: TRUE --> history push /log_in/confirm");
            history.push('/log_in/confirm');
        }
    }, [history, authSentEmail]);

    useEffect(() => {
        console.log('[LoginForm 2] secret:', secret);
        if (authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('Error!!');
            return;
        }
        console.log('[LoginForm 2] end');
    }, [authError, dispatch]);

    useEffect(() => {
        console.log('[LoginForm 3] secret:', secret);
        if (user) {
            console.log('check API 성공');
            if (secret === undefined) {
                console.log('secret is undefined');
            } else {
                console.log('secret is ', secret);
            }
            console.log(user);
            // eslint-disable-next-line react/prop-types
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
        console.log('[LoginForm 3] end');
    }, [history, user]);

    return (
        <Form className="form login-form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">Login 인증을 위한 E-mail을 입력하시요.</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <MailRuIcon />
                    </div>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="example@mail.com"
                        onChange={onChange}
                        value={form.email}
                        required
                    />
                </div>
            </div>
            <div className="form__form-group">
                <ButtonToolbar>
                    <Button className="account__btn btn btn-primary" color="white">전송</Button>
                </ButtonToolbar>
            </div>
        </Form>
    );
};

const LoginInputEmailFormWrap = withRouter(reduxForm()(LoginInputEmailForm));
export default LoginInputEmailFormWrap;
