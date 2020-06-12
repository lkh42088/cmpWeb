import React, { useState } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import WebIcon from 'mdi-react/WebIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import sineWave from "@iconify/icons-mdi/sine-wave";
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import DeviceSearch from "./DeviceSearch";
import InputIpAddr from "./InputIpAddr";
import IconPanelDivider from "../../../UI/Panels/components/IconPanelDivider";

// src/scss/component/form.scss
const SubnetWriteForm = ({handleSubmit, reset, t}) => {
    handleSubmit.propTypes = {handleSubmit: PropTypes.func.isRequired};
    reset.propTypes = {reset: PropTypes.func.isRequired};
    t.propTypes = {t: PropTypes.func.isRequired};

    return (
        <Col xs={12} md={12} lg={12} xl={8} cssModule="table">
            <Card>
                <CardBody>
                    <form className="form form--horizontal" onSubmit={handleSubmit}>
                        <DeviceSearch />    {/*장비 검색*/}
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET</span>
                            <div className="form__form-group-field">
                                <InputIpAddr nameText="subnet_start" holderText="Start" />
                                {/*<InputIpAddr nameText="subnet_end" holderText="End" activeIcon={WebIcon} />*/}
                                <InputIpAddr nameText="subnet_end" holderText="End" />
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
                                <InputIpAddr icon="MailRuIcon" nameText="subnet_mask" holderText="Mask" />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 게이트웨이</span>
                            <div className="form__form-group-field">
                                <InputIpAddr icon="MailRuIcon" nameText="subnet_gateway" holderText="Gateway" />
                            </div>
                        </div>
                        {/*Button*/}
                        <ButtonToolbar className="form__button-toolbar">
                            <Button color="primary" type="submit">Submit</Button>
                            <Button type="button" onClick={reset}>
                                Cancel
                                </Button>
                        </ButtonToolbar>
                    </form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default reduxForm({
    form: 'horizontal_form_layout_with_icons', // a unique identifier for this form
})(withTranslation('common')(SubnetWriteForm));
