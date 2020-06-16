import React, { useState, useEffect } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from "react-redux";
import InputIpAddr from "./InputIpAddr";
import {createSubnet, initSubnet, inputSubnet} from "../../../../../redux/actions/subnetActions";

// src/scss/component/form.scss
const SubnetWriteForm = () => {
    let isValid;
    const dispatch = useDispatch();
    const {
        deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
    } = useSelector(({ subnetRd }) => ({
        deviceCode: subnetRd.deviceCode,
        subnetTag: subnetRd.subnetTag,
        subnetStart: subnetRd.subnetStart,
        subnetEnd: subnetRd.subnetEnd,
        subnetMask: subnetRd.subnetMask,
        gateway: subnetRd.gateway,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name:", name, ", value:", value);
        dispatch(inputSubnet({key: name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (subnetStart && subnetEnd && subnetMask) {
            console.log("handleCreate.....");
            dispatch(createSubnet({
                deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
            }));
        }
        //dispatch(initSubnet());
    };

    const handleCancel = (e) => {
        e.preventDefault();
        dispatch(initSubnet());
    };

    return (
        <Col xs={12} md={12} lg={12} xl={8} cssModule="table">
            <Card>
                <CardBody>
                    <form className="form form-horizontal" onSubmit={handleSubmit}>
                        {/*<DeviceSearch onClick={onClick} onChange={handleChange} /> /!*장비 검색*!/*/}
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET</span>
                            <div className="form__form-group-field">
                                <InputIpAddr
                                    id="ipaddr1"
                                    nameText="subnetStart"
                                    text={subnetStart}
                                    holderText="Start" />
                                <InputIpAddr
                                    id="ipaddr2"
                                    nameText="subnetEnd"
                                    // text={subnetEnd}
                                    holderText="End" />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 태그</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    {/*<WebIcon />*/}
                                </div>
                                <input
                                    id="subnetTag"
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
                                    // text={subnetMask}
                                    holderText="Mask"
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 게이트웨이</span>
                            <div className="form__form-group-field">
                                <InputIpAddr
                                    id="ipaddr4"
                                    nameText="gateway"
                                    // text={gateway}
                                    holderText="Gateway"
                                />
                            </div>
                        </div>
                        {/*Button*/}
                        <ButtonToolbar className="form__button-toolbar">
                            <Button color="primary" type="submit" onClick={handleCreate}>
                                생성
                            </Button>
                            <Button type="button" onClick={handleCancel}>
                                취소
                            </Button>
                        </ButtonToolbar>
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

export default SubnetWriteForm;
// export default reduxForm({
//     form: 'create_subnet',
// })(SubnetWriteForm);
// export default reduxForm({
//     form: 'create_subnet',
// })(withTranslation('common')(SubnetWriteForm));
