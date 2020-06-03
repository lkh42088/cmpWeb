import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MailRuIcon from 'mdi-react/MailRuIcon';
import { Button, Alert } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import {withRouter} from "react-router-dom";
import {initializeForm, register, changeField } from "../../../redux/actions/authActions";

const RegisterForm = ({history}) => {
    const errorMessage = '';
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const {
        form,
        // eslint-disable-next-line no-shadow
    } = useSelector(({ auth, account }) => ({
        form: auth.register,
    }));

    const onChange = (e) => {
        const {value, name} = e.target;
        console.log('name', name);
        console.log('value', value);
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            name, email, username, password,
        } = form;
        console.log("handleSubmit");
        console.log("name", name);
        console.log("email", email);
        console.log("username", username);
        console.log("password", password);
        dispatch(register({
            name, email, username, password,
        }));
    };

    const changeShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        console.log('register init');
        dispatch(initializeForm("register"));
    }, [dispatch]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Alert
                color="danger"
                isOpen={!!errorMessage}
            >
                {errorMessage}
            </Alert>
            <div className="form__form-group">
                <span className="form__form-group-label">사용자</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <AccountOutlineIcon />
                    </div>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="이름"
                        onChange={onChange}
                        value={form.name}
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">E-mail</span>
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
                <span className="form__form-group-label">ID</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <AccountOutlineIcon />
                    </div>
                    <Field
                        name="username"
                        component="input"
                        type="text"
                        placeholder="계정"
                        onChange={onChange}
                        value={form.username}
                    />
                </div>
            </div>
            <div className="form__form-group form__form-group--forgot">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <KeyVariantIcon />
                    </div>
                    <Field
                        name="password"
                        component="input"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        onChange={onChange}
                        value={form.password}
                        required
                    />
                    <button
                        type="button"
                        className={`form__form-group-button${showPassword ? ' active' : ''}`}
                        onClick={e => changeShowPassword(e)}
                    ><EyeIcon />
                    </button>
                </div>
            </div>
            <div className="account__btns register__btns">
                <Button type="submit" color="primary" className="account__btn">
                    Create
                </Button>
            </div>
        </form>
    );
};

const RegisterFormWrap = withRouter(reduxForm({
        form: 'register_form',
})(RegisterForm));
export default RegisterFormWrap;
