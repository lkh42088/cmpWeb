/* eslint-disable react/no-children-prop */
import React, {useRef, useState, useEffect} from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import EmailAuthInsert from "./EmailAuthInsert";
import EmailAuthInsertedList from "./EmailAuthInsertedList";
import renderRadioButtonNBField from "./RadioButton";
import {
  addEmailGroup,
  changeEmailAuthFlag,
  changeEmailAuthGroupFlag,
  changeUserField, deleteEmailGroup, registerUser,
} from "../../../../redux/actions/usersActions";

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

const RegisterUser = ({ reset, t }) => {
  const dispatch = useDispatch();
  const {
    userId, userPassword, userName, userEmail, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList, msg, msgError,
  } = useSelector(({ regUser }) => ({
    userId: regUser.userId,
    userPassword: regUser.password,
    userName: regUser.username,
    userEmail: regUser.email,
    emailAuthFlag: regUser.emailAuthFlag,
    emailAuthGroupFlag: regUser.emailAuthGroupFlag,
    emailAuthGroupList: regUser.emailAuthGroupList,
    msg: regUser.msg,
    msgError: regUser.msgError,
  }));

  const nextId = useRef(1);

  /**
   * useEffect
   */
  useEffect(() => {
    // dispatch(initialize());
    console.log("------------------------------");
    console.log("RegisterUser: init");
    console.log("GroupFlag - ", emailAuthGroupFlag);
    console.log("Flag - ", emailAuthFlag);
    console.log("userId: ", userId);
    console.log("------------------------------");
  }, []);

  useEffect(() => {
    if (msg) {
      console.log("[msg]", msg);
    }
  }, [msg]);

  useEffect(() => {
    if (msgError) {
      console.log("[msgError]", msgError);
    }
  }, [msgError]);

  /**
   * Function
   */
  const onInsert = (email) => {
    const emailAuth = {
      id: nextId.current,
      email,
    };
    console.log("onInsert email:", email);
    console.log("onInsert emailAuth:", emailAuth);
    dispatch(addEmailGroup(emailAuthGroupList.concat(emailAuth)));
    nextId.current += 1;
  };

  const onRemove = (id) => {
    console.log("onRemove: ", id);
    dispatch(deleteEmailGroup(emailAuthGroupList.filter(emailAuth => emailAuth.id !== id)));
  };

  const switchEmailAuthFlag = (want) => {
    if (want !== emailAuthFlag) {
      dispatch(changeEmailAuthFlag());
    }
  };

  const switchEmailAuthGroupFlag = (want) => {
    if (want !== emailAuthGroupFlag) {
      dispatch(changeEmailAuthGroupFlag());
    }
  };

  const onChangeRadio = (value) => {
    if (value === '2') {
      /**
       * email auth
       **/
      switchEmailAuthFlag(true);
      switchEmailAuthGroupFlag(false);
    } else if (value === '3') {
      /**
       * email auth group
       **/
      switchEmailAuthGroupFlag(true);
      switchEmailAuthFlag(false);
    } else {
      /**
       * nothing
       **/
      switchEmailAuthGroupFlag(false);
      switchEmailAuthFlag(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log("key:", name, ", value:", value);
    dispatch(changeUserField({ key: name, value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("[onSubmit] id:", userId, "password: ", userPassword,
        "name: ", userName, "email: ", userEmail);
    dispatch(registerUser({
      userId,
      password: userPassword,
      username: userName,
      email: userEmail,
      emailAuthFlag,
      emailAuthGroupFlag,
      emailAuthGroupList,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("onSubmitForm >>>>>>>> ", e);
  };

  return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">{t('forms.material_from.animated_line')}</h5>
              <h5 className="subhead">Material design fields</h5>
            </div>
            <form className="material-form" onSubmit={onSubmitForm}>
              <div>
                <span className="material-form__label">ID</span>
                <Field
                    name="userId"
                    component={renderTextField}
                    placeholder="계정"
                    value={userId}
                    onChange={onChange}
                />
              </div>
              <div>
                <span className="material-form__label">Password</span>
                <Field
                    name="password"
                    component={renderTextField}
                    type="password"
                    value={userPassword}
                    onChange={onChange}
                />
              </div>
              <div>
                <span className="material-form__label">이름</span>
                <Field
                    name="username"
                    component={renderTextField}
                    type="username"
                    placeholder="홍길동"
                    value={userName}
                    onChange={onChange}
                />
              </div>
              <div>
                <span className="material-form__label">Email</span>
                <Field
                    name="email"
                    component={renderTextField}
                    placeholder="example@mail.com"
                    type="email"
                    value={userEmail}
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
                      onChange={onChangeRadio}
                  />
                </div>
                <div className="form__form-group-field">
                  <Field
                      name="radio"
                      component={renderRadioButtonNBField}
                      label="본인 이메일 인증"
                      radioValue="2"
                      onChange={onChangeRadio}
                  />
                </div>
                <div className="form__form-group-field">
                  <Field
                      name="radio"
                      component={renderRadioButtonNBField}
                      label="이메일 인증 그룹 생성"
                      radioValue="3"
                      onChange={onChangeRadio}
                  />
                </div>
              </div>
              {(emailAuthGroupFlag === true) && (
                  <div>
                    <EmailAuthInsert onInsert={onInsert}/>
                    <EmailAuthInsertedList emailAuths={emailAuthGroupList} onRemove={onRemove}/>
                  </div>
              )}
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
  reset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'material_form', // a unique identifier for this form
})(withTranslation('common')(RegisterUser));
