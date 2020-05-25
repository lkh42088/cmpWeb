/* eslint-disable react/no-children-prop */
import React, {useState, useRef, useCallback} from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import renderCheckBoxField from "../../../../shared/components/form/CheckBox";
import EmailAuthInsert from "./EmailAuthInsert";
import EmailAuthInsertedList from "./EmailAuthInsertedList";

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
    onChange={(e) => {
      e.preventDefault();
      input.onChange(e.target.value);
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
  const [emailAuths, setEmailAuths] = useState([
    {
      id: 0,
      email: "test",
    },
  ]);
  const [showGroupEmail, setShowGroupEmail] = useState(false);

  const nextId = useRef(1);

  const onInsert = useCallback(
      (email) => {
        const emailAuth = {
          id: nextId.current,
          email,
        };
        console.log("callback:", email);
        setEmailAuths(emailAuths.concat(emailAuth));
        nextId.current += 1;
      },
      [emailAuths],
  );

  const onRemove = useCallback(
      (id) => {
        setEmailAuths(emailAuths.filter(emailAuth => emailAuth.id !== id));
      },
      [emailAuths],
  );

  const onSubmit = (e) => {
    console.log("onSubmit >>>>>>>>");
      e.preventDefault();
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
                    name="id"
                    component={renderTextField}
                    placeholder="계정"
                />
              </div>
              <div>
                <span className="material-form__label">Password</span>
                <Field
                    name="password"
                    component={renderTextField}
                    type="password"
                />
              </div>
              <div>
                <span className="waterial-form__label">이름</span>
                <Field
                    name="username"
                    component={renderTextField}
                    type="username"
                    placeholder="홍길동"
                />
              </div>
              <div>
                <span className="material-form__label">Email</span>
                <Field
                    name="email"
                    component={renderTextField}
                    placeholder="example@mail.com"
                    type="email"
                />
              </div>
              <div>
                <Field
                    name="email_auth"
                    component={renderCheckBoxField}
                    label="계정 사용자의 Email 인증"
                    defaultChecked
                    className="colored-click"
                />
              </div>
              <div>
                <Field
                    name="add_email_auth"
                    component={renderCheckBoxField}
                    label="다른 사용자의 Email 인증"
                    defaultChecked
                    className="colored-click"
                />
                <EmailAuthInsert onInsert={onInsert}/>
                <EmailAuthInsertedList emailAuths={emailAuths} onRemove={onRemove}/>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                {/*<Button color="primary" type="submit" onClick={onSubmit}>등록</Button>*/}
                <Button color="primary" type="submit">등록</Button>
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
