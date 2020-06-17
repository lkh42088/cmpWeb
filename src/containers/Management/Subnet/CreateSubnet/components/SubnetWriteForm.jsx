import React, { useState, useEffect } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import {
    Field, getFormValues, formValueSelector, reduxForm,
} from 'redux-form';
import { connect, useDispatch, useSelector } from "react-redux";
import InputIpAddr from "./InputIpAddr";
import {createSubnet, initSubnet, inputSubnet} from "../../../../../redux/actions/subnetActions";

// reduxForm Field 형식
const renderField = ({
    input, label, type, meta: { touched, error, warning },
}) => (
    <div className="form__form-group-field" >
        <div className="form__form-group-icon" > </div>
        <div className="form__form-group">
            <input {...input} placeholder={label} type={type} />
            {touched && (error && <span>{error}</span>)}
        </div>
    </div>
);

// Validate 체크
function check(value) {
    return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
}

const ipCheck = value => (value && !check(value)
        ? 'IP 형식에 맞게 작성해주세요.'
        : undefined
);

const subnetMaskCheck = value => (value && !check(value)
        ? '서브넷 마스크를 IP 형식에 맞게 작성해주세요.'
        : undefined
);

const gatewayCheck = value => (value && !check(value)
        ? '게이트웨이를 IP 형식에 맞게 작성해주세요.'
        : undefined
);

// src/scss/component/form.scss
// eslint-disable-next-line import/no-mutable-exports
let SubnetWriteForm = (props) => {
    let isValid;
    // const msg = document.getElementById(id);
    const dispatch = useDispatch();
    // const {
    //     deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
    // } = useSelector(({ subnetRd }) => ({
    //     deviceCode: subnetRd.deviceCode,
    //     subnetTag: subnetRd.subnetTag,
    //     subnetStart: subnetRd.subnetStart,
    //     subnetEnd: subnetRd.subnetEnd,
    //     subnetMask: subnetRd.subnetMask,
    //     gateway: subnetRd.gateway,
    // }));

    // const selector = formValueSelector("subnetForm")
    // const {
    //     subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
    // } = selector('subnetTag', 'subnetStart', 'subnetEnd', 'subnetMask', 'gateway');
    //
    // const {
    //     subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
    // } = useSelector(({form}) => ({
    //     subnetStart: form.subnetRd.subnetStart,
    //     subnetEnd: form.subnetRd.subnetEnd,
    //     subnetTag: form.subnetRd.subnetTag,
    //     subnetMask: form.subnetRd.subnetMask,
    //     gateway: form.subnetRd.gateway,
    // }));

    // const themeName = useSelector(({theme}) => ({
    //     className: theme.className,
    // }));

    const {
        error, handleSubmit, pristine, reset, submitting,
    } = props;

    const submitCheck = () => {
      if (document.getElementById("subnetStart").value === ""
          || document.getElementById("subnetEnd").value === ""
          || document.getElementById("subnetMask").value === "") {
            return true;
      }
      return false;
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log("name:", name, ", value:", value);
    //     dispatch(inputSubnet({key: name, value}));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     //console.log(formRd.subnetRd.subnetMask);
    // };

    const handleCreate = (values) => {
        // if (subnetStart && subnetEnd && subnetMask) {
        //     console.log("handleCreate.....", this.state.subnetStart);
            // dispatch(createSubnet({
            //     deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
            // }));
        dispatch(createSubnet(values));
        // }
        // dispatch(initSubnet());
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log("[InputIpAddr] name:", name, ",value:", value);
    //     // Check IP address
    //     // isValid = validateIp(value);
    //     if (isValid === true) {
    //         // theme font-color 원복
    //         if (themeName.className === 'theme-light') {
    //             e.target.style.color = '#646777';
    //         } else {
    //             e.target.style.color = '#dddddd';
    //         }
    //     } else {
    //         // IP Address 형식에 맞지 않을 경우 font-color : red
    //         e.target.style.color = 'red';
    //     }
    //     dispatch(inputSubnet({key: name, value}));
    //
    //     // console.log("val: ", subnetTagVal);
    // };

    return (
        <Col xs={12} md={12} lg={9} xl={6} cssModule="table">
            <Card>
                <CardBody>
                    {/*<form className="form form-horizontal" onSubmit={handleSubmit}>*/}
                    <form className="form form-horizontal" name="subnetForm">
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET</span>
                            <div className="form__form-group-field">
                                <Field
                                    id="subnetStart"
                                    name="subnetStart"
                                    component={renderField}
                                    label="Start"
                                    validate={ipCheck}
                                />
                            </div>
                            <div className="form__form-group-field">
                                <Field
                                    id="subnetEnd"
                                    name="subnetEnd"
                                    component={renderField}
                                    label="End"
                                    validate={ipCheck}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 태그</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon" > </div>
                                <Field
                                    name="subnetTag"
                                    component="input"
                                    type="text"
                                    placeholder="Tag"
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 마스크</span>
                            <div className="form__form-group-field">
                                <Field
                                    id="subnetMask"
                                    name="subnetMask"
                                    component={renderField}
                                    label="Mask"
                                    validate={subnetMaskCheck}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 게이트웨이</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="gateway"
                                    component={renderField}
                                    label="Gateway"
                                    validate={gatewayCheck}
                                />
                            </div>
                        </div>
                        {/*Button*/}
                        <div className="form__form-group">
                            <ButtonToolbar className="form__button-toolbar-sub">
                                <Button color="primary"
                                        disabled={pristine || submitting}
                                        onClick={handleCreate}
                                        type="submit">
                                    생성
                                </Button>
                                <Button type="button"
                                        disabled={pristine || submitting}
                                        onClick={reset}>
                                    취소
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </Col>
    );
};

SubnetWriteForm.propTypes = {
    // input: PropTypes.shape().isRequired,
    // onSubmit: PropTypes.func.isRequired,
    // onMouseOver: PropTypes.func.isRequired,
    // onClick: PropTypes.func.isRequired,
    // onChange: PropTypes.func.isRequired,
};

SubnetWriteForm = reduxForm({
    form: 'create_subnet',
})(SubnetWriteForm);

// Data Selector
const selector = formValueSelector('create_subnet');
SubnetWriteForm = connect((state) => {
    const subnetTag = selector(state, 'subnetTag');
    const subnetStart = selector(state, 'subnetStart');
    const subnetEnd = selector(state, 'subnetEnd');
    const subnetMask = selector(state, 'subnetMask');
    const gateway = selector(state, 'gateway');
    return {
        subnetTag,
        subnetStart,
        subnetEnd,
        subnetMask,
        gateway,
    };
})(SubnetWriteForm);

export default SubnetWriteForm;
