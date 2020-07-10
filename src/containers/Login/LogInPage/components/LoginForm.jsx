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
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import {login} from "../../../../lib/api/auth";
import {GV_LOGIN_PAGE_CONFIRM_EMAIL, GV_LOGIN_PAGE_INPUT_EMAIL} from "../../../../lib/globalVariable";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ history }) => {
    const rememberForm = 'log_in_form';
    const typeFieldUser = 'text';
    const [showPassword, setShowPassword] = useState(false);
    const [resultError, setResultError] = useState(false);

    const dispatch = useDispatch();
    const {
        form,
        // authInputEmail,
        // authSentEmail,
    } = useSelector(({ accountRd }) => ({
        form: accountRd.login,
        auth: accountRd.auth,
        // authInputEmail: accountRd.authInputEmail,
        // authSentEmail: accountRd.authSentEmail,
        authError: accountRd.authError,
        user: accountRd.user,
    }));

    const onChange = (e) => {
        const { value, name } = e.target;
       /* console.log('name', name);
        console.log('value', value);*/
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    const doLogin = async (username, password) => {
        try {
            const response = await login({username, password});
            console.log("response: ", response);
            if (response.data !== null) {
                console.log("success: ", response.data.success);
                console.log("result ", response.data.msg.result);
            }
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
            } else {
                console.log("doLogin: XXXX");
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

        console.log('>>>>>> onSubmit');
        console.log('username:', username);
        console.log('password:', password);
        doLogin(username, password);
        // dispatch(login({ username, password }));
    };

    useEffect(() => {
        console.log('[LoginForm 1] ');
        dispatch(initializeForm("login"));
    }, [dispatch]);

    //
    // useEffect(() => {
    //     console.log("[useEffect] authSentEmail: ", authSentEmail);
    //     if (authSentEmail === true) {
    //         console.log("[useEffect] --> /login/confirm: ", authSentEmail);
    //         console.log("[user] form:", form);
    //         history.push('/login/confirm');
    //     }
    // }, [authSentEmail]);
    //
    // useEffect(() => {
    //     console.log("[useEffect] authInputEmail: ", authInputEmail);
    //     if (authInputEmail === true) {
    //         history.push('/login/input_email');
    //     }
    // }, [authInputEmail]);

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
                    {/*<div className="account__forgot-password">*/}
                    {/*    <a href="/">Forgot a password?</a>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="form__form-group">
                <div className="form__form-group form__form-group-field">
                    {/*<Field*/}
                    {/*    name={`remember_me-${rememberForm}`}*/}
                    {/*    component={renderCheckBoxField}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
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
