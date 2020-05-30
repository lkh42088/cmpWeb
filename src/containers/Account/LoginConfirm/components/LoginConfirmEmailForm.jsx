import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {tempSetUser} from "../../../../redux/actions/userActions";

// eslint-disable-next-line react/prop-types
const LoginConfirmEmailForm = ({ history }) => {
    const [isConfirm, setIsConfirm] = useState(false);
    const dispatch = useDispatch();
    const {
        form, authError, user,
        // eslint-disable-next-line no-shadow
    } = useSelector(({ auth, user }) => ({
        form: auth.login,
        authError: auth.authError,
        user: user.user,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('LoginConfirmEmail: onSubmit');
        // const { username, password, email } = form;
        // dispatch(login({ username, password }));
        console.log('id:', form.username);
        console.log('password:', form.password);
        console.log('email:', form.email);
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8081/api/auth/confirm',
                data: {
                    id: form.username,
                    password: form.password,
                    email: form.email,
                },
            });
            console.log("response:", response);
            dispatch(tempSetUser(response.data.user));
            setIsConfirm(true);
        } catch (err) {
            console.log('axios error:', err);
        }
    };

    useEffect(() => {
        console.log('>>>LoginConfirm: init');
        console.log('id:', form.username);
        console.log('password:', form.password);
        console.log('email:', form.email);
    }, [dispatch]);

    useEffect(() => {
        if (isConfirm) {
            console.log("Confirm: TRUE");
        }
    }, [isConfirm]);

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
