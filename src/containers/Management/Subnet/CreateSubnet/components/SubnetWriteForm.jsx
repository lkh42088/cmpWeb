import React from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import {
    Field, formValueSelector, reduxForm,
} from 'redux-form';
import {connect, useDispatch} from "react-redux";
import {createSubnet} from "../../../../../redux/actions/subnetActions";

// reduxForm Field 형식
const renderField = ({
    input, label, type, meta: { touched, error },
}) => (
    <div className="form__form-group-field" >
        <div className="form__form-group-icon" > </div>
        <div className="form__form-group">
            <input {...input} placeholder={label} type={type} />
            {touched && (error && <span style={{ color: '#FFC0CB' }}>{error}</span>)}
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
    const dispatch = useDispatch();
    const {
        error, handleSubmit, pristine, reset, submitting,
        subnetStartValue, subnetEndValue, subnetTagValue, subnetMaskValue, gatewayValue,
    } = props;

    const handleCreate = (e) => {
        e.preventDefault();
        // subnet action call
        dispatch(createSubnet({
                subnetTag: subnetTagValue,
                subnetStart: subnetStartValue,
                subnetEnd: subnetEndValue,
                subnetMask: subnetMaskValue,
                gateway: gatewayValue,
        }));
        // Init field
        dispatch(reset);
    };

    return (
        <Col xs={12} md={12} lg={9} xl={5} cssModule="table">
            <Card className="cb-card">
                <CardBody>
                    <form className="form form-horizontal">
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="subnetStart"
                                    component={renderField}
                                    label="Start"
                                    validate={ipCheck}
                                />
                            </div>
                            <div className="form__form-group-field">
                                <Field
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
                                        disabled={!(subnetStartValue && subnetEndValue && subnetMaskValue)
                                        || pristine || submitting}
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

SubnetWriteForm = reduxForm({
    form: 'create_subnet',
})(SubnetWriteForm);

// Data Selector
const selector = formValueSelector('create_subnet');
SubnetWriteForm = connect((state) => {
    const subnetTagValue = selector(state, 'subnetTag');
    const subnetStartValue = selector(state, 'subnetStart');
    const subnetEndValue = selector(state, 'subnetEnd');
    const subnetMaskValue = selector(state, 'subnetMask');
    const gatewayValue = selector(state, 'gateway');
    return {
        subnetTagValue,
        subnetStartValue,
        subnetEndValue,
        subnetMaskValue,
        gatewayValue,
    };
})(SubnetWriteForm);

export default SubnetWriteForm;
