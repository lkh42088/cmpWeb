import React, {useState} from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Container,
} from 'reactstrap';
import {
    Field, formValueSelector, reduxForm,
} from 'redux-form';
import {connect, useDispatch} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FormHelperText from "@material-ui/core/FormHelperText";
import {createSubnet} from "../../../../../redux/actions/subnetActions";

// reduxForm Field 형식
const renderField = ({
    input, label, type, meta: { touched, error }, fields,
}) => {
    console.log(label, fields);
    return (
        <div className="form__form-group-field">
            <div className="form__form-group">
                <input {...input} placeholder={label} type={type} />
                {touched && (error && <span style={{padding: "5px", color: '#FFC0CB'}}>{error}</span>)}
            </div>
        </div>
    );
};

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
        error, pristine, reset, submitting,
        subnetStartValue, subnetEndValue, subnetTagValue, subnetMaskValue, gatewayValue,
        open, data, handleClose, handleSubmit,
    } = props;

    const [fields, setFields] = useState({
        subnetStart: '',
        subnetEnd: '',
        subnetTag: '',
        subnetMask: '',
        gateway: '',
    });
    
    const handleChangeField = (label, value) => {
        setFields({
            ...fields,
            [label]: value,
        });  
    };

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
        handleClose();
    };

    const handleClickCancel = () => {
        reset();
        handleClose();
    };

    return (
        <Col>
            <form className="form form--horizontal">
                <div className="form__form-group">
                    <span className="form__form-group-label">SUBNET</span>
                    <div className="cb-form__form-group-field-subnet">
                        <Field
                            name="subnetStart"
                            component={renderField}
                            label="Start"
                            validate={ipCheck}
                            fields={fields.subnetStart}
                        />
                    </div>
                    <div className="form__form-group-field">
                        <Field
                            name="subnetEnd"
                            component={renderField}
                            label="End"
                            validate={ipCheck}
                            fields={fields.subnetEnd}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">SUBNET 태그</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon" > </div>
                        <Field
                            name="subnetTag"
                            component={renderField}
                            type="text"
                            label="Tag"
                            fields={fields.subnetTag}
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
                            fields={fields.subnetMask}
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
                            fields={fields.gateway}
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
                            // disabled={pristine || submitting}
                                onClick={handleClickCancel}>
                            취소
                        </Button>
                    </ButtonToolbar>
                </div>
            </form>
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

// export default SubnetWriteForm;
