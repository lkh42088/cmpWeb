import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, login } from "../../../redux/actions/authActions";
import { check } from "../../../redux/actions/accountActions";
import renderCheckBoxField from '../form/CheckBox';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ history, secret }) => {
    const rememberForm = 'log_in_form';
    const typeFieldUser = 'text';
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {
        form, auth, authError, user,
        // eslint-disable-next-line no-shadow
    } = useSelector(({ auth, account }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: account.user,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('onSubmit');
        const { username, password } = form;
        console.log('username:', username);
        console.log('password:', password);
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        console.log('[LoginForm 1] secret:', secret);
        dispatch(initializeForm("login"));
        console.log('[LoginForm 1] end');
    }, [dispatch]);

    useEffect(() => {
        console.log('[LoginForm 2] secret:', secret);
        if (authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('Error!!');
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
        console.log('[LoginForm 2] end');
    }, [auth, authError, dispatch]);

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

    const changeShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <Form className="form login-form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">ID</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <AccountOutlineIcon/>
                    </div>
                    <Field
                        name="username"
                        component="input"
                        type={typeFieldUser}
                        placeholder="계정"
                        onChange={onChange}
                        value={form.username}
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <KeyVariantIcon/>
                    </div>
                    <Field
                        name="password"
                        component="input"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        onChange={onChange}
                        value={form.password}
                    />
                    <button
                        type="button"
                        className={`form__form-group-button${showPassword ? ' active' : ''}`}
                        onClick={e => changeShowPassword(e)}
                    ><EyeIcon/>
                    </button>
                    <div className="account__forgot-password">
                        <a href="/">Forgot a password?</a>
                    </div>
                </div>
            </div>
            <div className="form__form-group">
                <div className="form__form-group form__form-group-field">
                    <Field
                        name={`remember_me-${rememberForm}`}
                        component={renderCheckBoxField}
                        label="Remember me"
                    />
                </div>
            </div>

            <div className="form__form-group">
                <ButtonToolbar>
                    <Button className="account__btn btn btn-primary" color="white">로그인</Button>
                </ButtonToolbar>
            </div>
        </Form>
    );
};

const LoginFormWrap = withRouter(reduxForm()(LoginForm));
export default LoginFormWrap;
