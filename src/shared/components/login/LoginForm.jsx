import React, {useState} from 'react';
import {Field, Form, reduxForm} from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import {Link} from 'react-router-dom';
import renderCheckBoxField from '../form/CheckBox';

const LoginForm = () => {
    const typeFieldUser = 'text';
    const fieldUser = 'Username';
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const setPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <Form className="form login-form" onSubmit={onSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">{fieldUser}</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <AccountOutlineIcon/>
                    </div>
                    <Field
                        name="username"
                        component="input"
                        type={typeFieldUser}
                        placeholder={fieldUser}
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
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        className={`form__form-group-button${showPassword ? ' active' : ''}`}
                        onClick={e => setPassword(e)}
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
                        // name={`remember_me-${form}`}
                        component={renderCheckBoxField}
                        label="Remember me"
                    />
                </div>
            </div>

            <div className="account__btns">
                <Link className="account__btn btn btn-primary" to="/" title="개발중"> Sign In </Link>
            </div>
        </Form>
    );
};

const LoginFormWrap = reduxForm()(LoginForm);
export default LoginFormWrap;
