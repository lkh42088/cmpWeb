import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import MailRuIcon from "mdi-react/MailRuIcon";
import {changeField, changeLoginPage } from "../../../../redux/actions/accountActions";
import {loginEmail} from "../../../../lib/api/auth";
import {GV_LOGIN_PAGE_CONFIRM_EMAIL} from "../../../../lib/globalVariable";

// eslint-disable-next-line react/prop-types
const LoginInputEmailForm = ({ history, secret }) => {
    const dispatch = useDispatch();
    const {
        form,
    } = useSelector(({ accountRd }) => ({
        form: accountRd.login,
    }));

    const [resultError, setResultError] = useState(false);

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

    const doLoginEmail = async (username, password, email) => {
        try {
            const response = await loginEmail({username, password, email});
            /**
             * response.data.success : {false, true}
             * response.data.msg : {id, password, email, result}
             */
            if (response.data.msg) {
                if (response.data.msg.result === 251) {
                    console.log("changeLoginPage ", GV_LOGIN_PAGE_CONFIRM_EMAIL);
                    dispatch(changeLoginPage({value: GV_LOGIN_PAGE_CONFIRM_EMAIL}));
                } else {
                    console.log("changeLoginPage XXX", response.data.msg.result);
                }
            }
            if (resultError) {
                setResultError(false);
            }
        } catch (e) {
            console.log("loginEmail error!");
            setResultError(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('LoginInputEmail: onSubmit');
        console.log('id:', form.username);
        console.log('password:', form.password);
        console.log('email:', form.email);
        const { username, password, email } = form;
        doLoginEmail(username, password, email);
    };

    useEffect(() => {
        console.log('[LoginForm 1]');
        if (form.username === "" || form.password === "") {
            history.push('/login');
        }
    }, [dispatch]);

    return (
        <Form className="form login-form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">Login 인증을 위한 Email을 입력하십시오.</span>
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
            { resultError ? (
                <div>
                    <span style={{
                        color: "red",
                    }} >* 등록된 Email이 아닙니다!</span>
                </div>
            ) : <div/>}
        </Form>
    );
};

const LoginInputEmailFormWrap = withRouter(reduxForm()(LoginInputEmailForm));
export default LoginInputEmailFormWrap;
