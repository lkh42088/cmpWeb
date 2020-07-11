import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    checkLoginUser,
    changeField,
    initializeForm, changeLoginPage,
} from "../../../../redux/actions/accountActions";
import {login} from "../../../../lib/api/auth";
import {GV_LOGIN_PAGE_CONFIRM_EMAIL, GV_LOGIN_PAGE_INPUT_EMAIL} from "../../../../lib/globalVariable";

const LoginForm = () => {
    const typeFieldUser = 'text';
    const [showPassword, setShowPassword] = useState(false);
    const [resultError, setResultError] = useState(false);

    const dispatch = useDispatch();
    const { form } = useSelector(({ accountRd }) => ({
        form: accountRd.login,
    }));

    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    const doLogin = async (username, password) => {
        console.log("doLogin: username: ", username, ", password ", password);
        try {
            const response = await login({username, password});
            /**
             * response.data.success : {false, true}
             * response.data.msg : {id, password, email, result}
             * */
            console.log("response: ", response);
            if (response.data.success) {
                dispatch(checkLoginUser());
            } else if (response.data.msg.result === 251) {
                console.log("email: ", response.data.msg.email);
                console.log("changeLoginPage ", GV_LOGIN_PAGE_CONFIRM_EMAIL);
                dispatch(changeLoginPage({value: GV_LOGIN_PAGE_CONFIRM_EMAIL}));
                dispatch(
                    changeField({
                        form: 'login',
                        key: "email",
                        value: response.data.msg.email,
                    }),
                );
            } else if (response.data.msg.result === 252) {
                console.log("changeLoginPage ", GV_LOGIN_PAGE_INPUT_EMAIL);
                dispatch(changeLoginPage({value: GV_LOGIN_PAGE_INPUT_EMAIL}));
            }
            if (resultError) {
                setResultError(false);
            }
        } catch (e) {
            console.log("doLogin: error! ", e);
            setResultError(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = form;
        console.log('>>>>>> onSubmit: username ', username, ", password ", password);
        doLogin(username, password);
    };

    useEffect(() => {
        console.log('[LoginForm 1] ');
        dispatch(initializeForm("login"));
    }, []);

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
                </div>
            </div>
            <div className="form__form-group">
                <ButtonToolbar>
                    <Button className="account__btn btn btn-primary" color="white">로그인</Button>
                </ButtonToolbar>
            </div>
            { resultError ? (
                <div>
                    <span style={{
                        color: "red",
                    }} >* ID 또는 Password가 일치하지 않습니다!</span>
                </div>
            ) : <div/>}
        </Form>
    );
};

const LoginFormWrap = withRouter(reduxForm()(LoginForm));
export default LoginFormWrap;
