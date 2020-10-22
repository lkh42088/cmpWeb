import React, {useEffect, useState} from 'react';
import {Button, ButtonToolbar} from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import {useDispatch, useSelector} from "react-redux";
import {
    checkLoginUser, changeLoginField, initLoginForm,
    changeLoginPage, logout,
} from "../../../../redux/actions/loginActions";
import {login} from "../../../../lib/api/login";
import {
    GV_LOGIN_PAGE_CONFIRM_EMAIL,
    GV_LOGIN_PAGE_INPUT_EMAIL,
} from "../../../../lib/var/globalVariable";
import GoogleRecaptcha from "../../Captcha/components/GoogleRecaptcha";

const LoginForm = () => {
    const typeFieldUser = 'text';
    const defaultErrMsg = "* ID 또는 Password가 일치하지 않습니다!";
    const captchaErrMsg = "* ReCAPTCHA 확인이 필요합니다!";
    const authErrMsg = "* 해지고객은 로그인할 수 없습니다.";
    const [showPassword, setShowPassword] = useState(false);
    const [resultError, setResultError] = useState(false);
    // For ReCAPTCHA
    const [loginFailCount, setLoginFailCount] = useState(1);
    const [captchaVisible, setCaptchaVisible] = useState(false);
    const [captchaOk, setCaptchaOk] = useState(false);
    const [errorMessage, setErrorMessage] = useState(defaultErrMsg);

    const dispatch = useDispatch();
    const {form} = useSelector(({accountRd}) => ({
        form: accountRd.login,
    }));

    const checkReCaptcha = () => {
        if (!captchaOk) {
            setResultError(true);
            return false;
        }
        setCaptchaOk(true);
        return true;
    };

    const onChange = (e) => {
        const {value, name} = e.target;
        dispatch(
            changeLoginField({
                key: name,
                value,
            }),
        );
    };

    const doLogin = async (username, password) => {
        //console.log("doLogin: username: ", username, ", password ", password);
        try {
            const response = await login({
                username,
                password,
            });
            /**
             * response.data.success : {false, true}
             * response.data.msg : {id, password, email, result}
             * */

            if (response.data.success) {
                // logout on captcha failed

                /*해지 고객일 경우 */
                if (response.data.user.level === 10) {
                    setErrorMessage(authErrMsg);
                    dispatch(logout());
                    return;
                }

                if (loginFailCount >= 3 && checkReCaptcha() === false) {
                    setErrorMessage(captchaErrMsg);
                    dispatch(logout());
                    return;
                }
                dispatch(checkLoginUser());
            } else if (response.data.msg.result === 251) {
                //console.log("email: ", response.data.msg.email);
                //console.log("changeLoginPage ", GV_LOGIN_PAGE_CONFIRM_EMAIL);
                dispatch(changeLoginPage({value: GV_LOGIN_PAGE_CONFIRM_EMAIL}));
                dispatch(
                    changeLoginField({
                        key: "email",
                        value: response.data.msg.email,
                    }),
                );
            } else if (response.data.msg.result === 252) {
                //console.log("changeLoginPage ", GV_LOGIN_PAGE_INPUT_EMAIL);
                dispatch(changeLoginPage({value: GV_LOGIN_PAGE_INPUT_EMAIL}));
            }
            if (resultError) {
                setResultError(false);
            }
        } catch (e) {
            console.log("doLogin: error! ", e);
            setResultError(true);
            // Captcha
            setLoginFailCount(loginFailCount + 1);
            if (loginFailCount >= 3) {
                setCaptchaVisible(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = form;
        //console.log('>>>>>> onSubmit: username ', username, ", password ", password);
        doLogin(username, password);
    };

    useEffect(() => {
        //console.log('[LoginForm 1] ');
        dispatch(initLoginForm());
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
                <div className="account__or">
                    <p style={{
                        color: "#ffffff",
                    }}><a href="http://nubes-bridge.com" target="_parent">
                        &nbsp;http://nubes-bridge.com&nbsp;
                    </a></p>
                </div>
                <GoogleRecaptcha
                    visible={captchaVisible}
                    setCaptchaOk={setCaptchaOk}
                />
            </div>
            <div className="form__form-group">
                <ButtonToolbar>
                    <Button className="account__btn btn btn-primary" color="white">로그인</Button>
                </ButtonToolbar>
            </div>
            {resultError ? (
                <div>
                    <span style={{
                        color: "red",
                    }}>{errorMessage}</span>
                </div>
            ) : <div/>}
        </Form>
    );
};

export default reduxForm()(LoginForm);
