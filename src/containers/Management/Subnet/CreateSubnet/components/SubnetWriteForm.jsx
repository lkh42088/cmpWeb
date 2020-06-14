import React, { useState, useEffect } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import DeviceSearch from "./DeviceSearch";
import InputIpAddr from "./InputIpAddr";


// src/scss/component/form.scss
const SubnetWriteForm = ({
    input,
    onChange,
    onClick,
    onMouseOver,
    onSubmit,
    }) => {
    const dispatch = useDispatch();
    // const {
    //     deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
    // } = useSelector(({ createSubnet }) => ({
    //     deviceCode: createSubnet.deviceCode,
    //     subnetTag: createSubnet.subnetTag,
    //     subnetStart: createSubnet.subnetStart,
    //     subnetEnd: createSubnet.subnetEnd,
    //     subnetMask: createSubnet.subnetMask,
    //     gateway: createSubnet.gateway,
    // }));

    /* useEffect */
    useEffect(() => {
        //console.log("=============");
    }, []);

    return (
        <Col xs={12} md={12} lg={12} xl={8} cssModule="table">
            <Card>
                <CardBody>
                    <form className="form form--horizontal" onSubmit={onSubmit}>
                        <DeviceSearch/> {/*장비 검색*/}
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET</span>
                            <div className="form__form-group-field">
                                <InputIpAddr nameText="subnet_start" holderText="Start"/>
                                <InputIpAddr nameText="subnet_end" holderText="End"/>
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 태그</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    {/*<WebIcon />*/}
                                </div>
                                <Field
                                    name="subnet_tag"
                                    component="input"
                                    type="text"
                                    placeholder="Tag"
                                    // onChange={onChangeSubnetTag}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 마스크</span>
                            <div className="form__form-group-field">
                                <InputIpAddr icon="MailRuIcon" nameText="subnet_mask" holderText="Mask"/>
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 게이트웨이</span>
                            <div className="form__form-group-field">
                                <InputIpAddr icon="MailRuIcon" nameText="subnet_gateway" holderText="Gateway"/>
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
    form: 'horizontal_form_layout_with_icons', // a unique identifier for this form
})(withTranslation('common')(SubnetWriteForm));
