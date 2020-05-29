import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonToolbar } from 'reactstrap';
import {Field, Form, reduxForm} from 'redux-form';
import { withRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {tempSetUser} from "../../../../redux/actions/userActions";

// eslint-disable-next-line react/prop-types
const LoginConfirmEmailForm = ({ history, secret }) => {
    const [error, setError] = useState(null);
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
        console.log('onSubmit');
        // const { username, password, email } = form;
        // dispatch(login({ username, password }));

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
        } catch (err) {
            console.log('axios error:', err);
        }
    };

    useEffect(() => {
        console.log('[LoginForm 2] secret:', secret);
        if (authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('Error!!');
            return;
        }
        console.log('[LoginForm 2] end');
    }, [authError, dispatch]);

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
