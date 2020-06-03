import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {check, tempSetUser} from "../../../../redux/actions/accountActions";
import {loginConfirm} from "../../../../redux/actions/authActions";

// eslint-disable-next-line react/prop-types
const LoginConfirmEmailForm = ({ history }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('LoginConfirmEmail: onSubmit');
        const { username, password, email } = form;
        console.log('username:', {username});
        console.log('pw:', {username});
        console.log('email:', {username});
        dispatch(loginConfirm({username, password, email}));
    };

    useEffect(() => {
        console.log('>>>LoginConfirm: init');
        console.log('id:', form.username);
        console.log('password:', form.password);
        console.log('email:', form.email);
        if (form.username === "" || form.password === "") {
            history.push('/log_in');
        } else if (form.email === "") {
            history.push('/log_in/input_email');
        }
    }, [dispatch]);

    useEffect(() => {
        console.log("auth..");
        if (auth) {
            console.log("auth:", user, " --> user");
            dispatch(check());
        }
    }, [auth]);

    useEffect(() => {
        console.log("user..");
        if (user) {
            console.log("user:", user, " --> history");
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [user]);

    return (
        <Form className="form login-form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span className="form__form-group-label">Email에서 인증을 한 후, 확인을 클릭하세요.</span>
            </div>
            <div className="form__form-group">
                <ButtonToolbar>
                    <Button className="account__btn btn btn-primary" color="white">확인</Button>
                </ButtonToolbar>
            </div>
        </Form>
    );
};

const LoginConfirmEmailFormWrap = withRouter(reduxForm()(LoginConfirmEmailForm));
export default LoginConfirmEmailFormWrap;
