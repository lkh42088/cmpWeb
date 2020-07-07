import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    changeLoginPage,
    checkLoginUser,
} from "../../../../redux/actions/accountActions";
import {GV_LOGIN_PAGE_FIRST, GV_LOGIN_PAGE_INPUT_EMAIL} from "../../../../lib/globalVariable";
import {loginConfirm} from "../../../../lib/api/auth";

// eslint-disable-next-line react/prop-types
const LoginConfirmEmailForm = ({ history }) => {
    const dispatch = useDispatch();
    const {
        form,
        authError,
        user,
        auth,
        // eslint-disable-next-line no-shadow
    } = useSelector(({ accountRd }) => ({
        form: accountRd.login,
        auth: accountRd.auth,
        authError: accountRd.authError,
        user: accountRd.user,
    }));

    const doLoginConfirm = async (username, password, email) => {
        try {
            const response = await loginConfirm({username, password, email});
            console.log("doLoginConfirm: response.. ", response);
            if (response.data.success === true) {
                console.log("doLoginConfirm: user...", response.data.user);
                dispatch(checkLoginUser());
                // if (response.data.user) {
                //     console.log("doLoginConfirm: user..", response.data.user);
                //     if (response.data.success === true) {
                //         console.log("doLoginConfirm: localstorage.");
                //         localStorage.setItem('user', JSON.stringify(response.data.user));
                //         history.push('/dashboards/manager');
                //     }
                // }
            }
        } catch (e) {
            console.log("doLoginConfirm: error ");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, email } = form;
        console.log('LoginConfirmEmail: onSubmit...');
        console.log('username:', {username});
        console.log('pw:', {password});
        console.log('email:', {email});
        doLoginConfirm(username, password, email);
        // dispatch(loginConfirm({username, password, email}));
    };

    useEffect(() => {
        if (form.username === "" || form.password === "") {
            console.log('id/password is empty!');
            dispatch(changeLoginPage({value: GV_LOGIN_PAGE_FIRST}));
        }
    }, []);

    useEffect(() => {
        console.log("auth..");
        if (auth) {
            console.log("auth:", user, " --> user");
            // dispatch(checkLoginUser());
        }
    }, [auth]);

    useEffect(() => {
        console.log("user..");
        if (user) {
            console.log("user:", user, " --> history");
            // history.push('/');
            history.push('/dashboards/manager');
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
