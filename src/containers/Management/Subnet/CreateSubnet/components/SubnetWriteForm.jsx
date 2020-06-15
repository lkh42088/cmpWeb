import React, { useState, useEffect } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import DeviceSearch from "./DeviceSearch";
import InputIpAddr from "./InputIpAddr";
import { inputSubnet } from "../../../../../redux/actions/subnetActions";

// src/scss/component/form.scss
const SubnetWriteForm = ({
    input,
    onChange,
    onClick,
    onMouseOver,
    onSubmit,
    }) => {
    const dispatch = useDispatch();
    const {
        deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
    } = useSelector(({ subnetRd }) => ({
        // deviceCode: createSubnet.deviceCode,
        // subnetTag: createSubnet.subnetTag,
        // subnetStart: createSubnet.subnetStart,
        // subnetEnd: createSubnet.subnetEnd,
        // subnetMask: createSubnet.subnetMask,
        // gateway: createSubnet.gateway,
    }));

    /* useEffect */
    useEffect(() => {
        console.log();
    }, []);

    const handleChange = () => {
    //     const { value } = e.target.value;
    //     console.log("data : ", value);
    //     dispatch(inputSubnet);
    };

    return (
        <Col xs={12} md={12} lg={12} xl={8} cssModule="table">
            <Card>
                <CardBody>
                    <form className="form form--horizontal" onSubmit={onSubmit}>
                        {/*<DeviceSearch onClick={onClick} onChange={handleChange} /> /!*장비 검색*!/*/}
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET</span>
                            <div className="form__form-group-field">
                                <InputIpAddr
                                    id="ipaddr1"
                                    nameText="subnetStart"
                                    holderText="Start"
                                    onChange={handleChange} />
                                <InputIpAddr
                                    id="ipaddr2"
                                    nameText="subnetEnd"
                                    holderText="End"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 태그</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    {/*<WebIcon />*/}
                                </div>
                                <Field
                                    name="subnetTag"
                                    component="input"
                                    type="text"
                                    placeholder="Tag"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 마스크</span>
                            <div className="form__form-group-field">
                                <InputIpAddr
                                    id="ipaddr3"
                                    nameText="subnetMask"
                                    holderText="Mask"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 게이트웨이</span>
                            <div className="form__form-group-field">
                                <InputIpAddr
                                    id="ipaddr4"
                                    nameText="gateway"
                                    holderText="Gateway"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        {/*Button*/}
                        <ButtonToolbar className="form__button-toolbar">
                            <Button color="primary" type="submit">Submit</Button>
                            <Button type="button" onClick={onClick}>
                                Cancel
                            </Button>
                        </ButtonToolbar>
                    </form>
                </CardBody>
            </Card>
        </Col>
    );
};

SubnetWriteForm.propTypes = {
    input: PropTypes.shape().isRequired,
    onSubmit: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'create_subnet',
})(withTranslation('common')(SubnetWriteForm));
