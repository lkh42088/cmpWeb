import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import {Form, reduxForm} from 'redux-form';
import { useDispatch, useSelector } from "react-redux";
import {
    changeLoginPage,
    checkLoginUser,
} from "../../../../redux/actions/accountActions";
import {GV_LOGIN_PAGE_FIRST} from "../../../../lib/globalVariable";
import {loginConfirm} from "../../../../lib/api/auth";

const LoginConfirmEmailForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ accountRd }) => ({
        form: accountRd.login,
    }));

    const [resultError, setResultError] = useState(false);

    const doLoginConfirm = async (username, password, email) => {
        try {
            const response = await loginConfirm({username, password, email});
            /**
             * response.data.success : {false, true}
             * response.data.msg : {id, password, email, result}
             * */
            console.log("doLoginConfirm: response.. ", response);
            if (response.data.success === true) {
                dispatch(checkLoginUser());
                if (resultError === true) {
                    setResultError(false);
                }
            }
        } catch (e) {
            console.log("doLoginConfirm: error ");
            setResultError(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, email } = form;
        doLoginConfirm(username, password, email);
    };

    useEffect(() => {
        if (form.username === "" || form.password === "") {
            dispatch(changeLoginPage({value: GV_LOGIN_PAGE_FIRST}));
        }
    }, []);

    return (
        <Form className="form login-form" onSubmit={handleSubmit}>
            <div className="form__form-group">
                <span
                    className="form__form-group-label"
                >
                    Email에서 인증을 한 후, 확인을 클릭하세요.
                </span>
            </div>
            <div className="form__form-group">
                <ButtonToolbar>
                    <Button
                        className="account__btn btn btn-primary"
                        color="white"
                    >
                        확인
                    </Button>
                </ButtonToolbar>
            </div>
            { resultError ? (
                <div>
                    <span style={{
                        color: "red",
                    }} >* 인증되지 않았습니다!</span>
                </div>
            ) : <div/>}
        </Form>
    );
};

export default reduxForm()(LoginConfirmEmailForm);
