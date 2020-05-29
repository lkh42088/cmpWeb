/* eslint-disable react/no-children-prop */
import React, {useState, useRef, useCallback} from 'react';
import axios from "axios";
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import EmailAuthInsert from "./EmailAuthInsert";
import EmailAuthInsertedList from "./EmailAuthInsertedList";
import renderCheckBoxNbField from "./CheckBox";
import renderRadioButtonNBField from "./RadioButton";

const renderTextField = ({
  input, label, meta: { touched, error }, children, select,
}) => (
  <TextField
    className="material-form__field"
    label={label}
    error={touched && error}
    value={input.value}
    children={children}
    select={select}
    name={input.name}
    onChange={(e) => {
      e.preventDefault();
      // input.onChange(e.target.value);
      input.onChange(e);
    }}
  />
);

renderTextField.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  select: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

renderTextField.defaultProps = {
  label: '',
  meta: null,
  select: false,
  children: [],
};

const RegisterUser = ({ handleSubmit, reset, t }) => {
  const [emailGroupAuth, setEmailAuths] = useState([]);
  const [emailAuthCheck, setEmailAuthCheck] = useState(false);
  const [emailAuthGroupCheck, setEmailAuthGroupCheck] = useState(false);
  const [userState, setUserState] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userEmail: "",
  });

  const nextId = useRef(1);

  const onInsert = useCallback(
      (email) => {
        const emailAuth = {
          id: nextId.current,
          email,
        };
        console.log("callback:", email);
        setEmailAuths(emailGroupAuth.concat(emailAuth));
        nextId.current += 1;
      },
      [emailGroupAuth],
  );

  const onRemove = useCallback(
      (id) => {
        setEmailAuths(emailGroupAuth.filter(emailAuth => emailAuth.id !== id));
      },
      [emailGroupAuth],
  );

  const onChangeEmailAuth = (e) => {
    if (typeof e === "boolean") {
      setEmailAuthCheck(e);
    } else if (typeof e === 'object') {
      setEmailAuthCheck(e.target.checked);
    }
  };

  const onChangeGroupEmailAuth = (e) => {
    if (typeof e === "boolean") {
      setEmailAuthGroupCheck(e);
    } else if (typeof e === 'object') {
      setEmailAuthGroupCheck(e.target.checked);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit >>>>>>>> ", e);
    console.log("name: ", userState.userName);
    console.log("id: ", userState.userId);
    console.log("password: ", userState.userPassword);
    console.log("email: ", userState.userEmail);
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8081/api/auth/register',
        data: {
          id: userState.userId,
          password: userState.userPassword,
          name: userState.userName,
          email: userState.userEmail,
        },
      });
    } catch (error) {
      console.log('axios error: ', error);
    }
  };

  return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">{t('forms.material_from.animated_line')}</h5>
              <h5 className="subhead">Material design fields</h5>
            </div>
            {/*<form className="material-form" onSubmit={handleSubmit}>*/}
            <form className="material-form" onSubmit={onSubmit}>
              <div>
                <span className="material-form__label">ID</span>
                <Field
                    name="userId"
                    component={renderTextField}
                    placeholder="계정"
                    value={userState.userId}
                    onChange={onChange}
                />
              </div>
              <div>
                <span className="material-form__label">Password</span>
                <Field
                    name="userPassword"
                    component={renderTextField}
                    type="password"
                    value={userState.userPassword}
                    onChange={onChange}
                />
              </div>
              <div>
                <span className="material-form__label">이름</span>
                <Field
                    name="userName"
                    component={renderTextField}
                    type="username"
                    placeholder="홍길동"
                    value={userState.userName}
                    onChange={onChange}
                />
              </div>
              <div>
                <span className="material-form__label">Email</span>
                <Field
                    name="userEmail"
                    component={renderTextField}
                    placeholder="example@mail.com"
                    type="email"
                    value={userState.userEmail}
                    onChange={onChange}
                />
              </div>

              <div>
                <div className="form__form-group">
                  <span className="material-form__label">Email 인증</span>
                </div>
                <div className="form__form-group-field">
                  <Field
                      name="radio"
                      component={renderRadioButtonNBField}
                      label="사용 안함"
                      radioValue="1"
                      defaultChecked
                  />
                </div>
                <div className="form__form-group-field">
                  <Field
                      name="radio"
                      component={renderRadioButtonNBField}
                      label="본인 이메일 인증"
                      radioValue="2"
                  />
                </div>
                <div className="form__form-group-field">
                  <Field
                      name="radio"
                      component={renderRadioButtonNBField}
                      label="이메일 인증 그룹 생성"
                      radioValue="3"
                  />
                </div>
              </div>

              <div>
                <Field
                    name="email_auth"
                    component={renderCheckBoxNbField}
                    label="계정 사용자의 Email 인증"
                    defaultChecked={emailAuthCheck}
                    onChange={onChangeEmailAuth}
                    Value={onChangeEmailAuth}
                    className="colored-click"
                />
              </div>
              <div>
                <Field
                    name="add_email_auth"
                    component={renderCheckBoxNbField}
                    label="다른 사용자의 Email 인증"
                    defaultChecked={emailAuthGroupCheck}
                    onChange={onChangeGroupEmailAuth}
                    className="colored-click"
                />
                {emailAuthGroupCheck === true
                && (
                    <div>
                      <EmailAuthInsert onInsert={onInsert}/>
                      <EmailAuthInsertedList emailAuths={emailGroupAuth} onRemove={onRemove}/>
                    </div>
                )}
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit" onClick={onSubmit}>등록</Button>
                <Button type="button" onClick={reset}>
                  취소
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
  );
};

RegisterUser.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'material_form', // a unique identifier for this form
})(withTranslation('common')(RegisterUser));
