import React, { useState } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import WebIcon from 'mdi-react/WebIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';
import DeviceSearch from "./DeviceSearch";
import InputIpAddr from "./InputIpAddr";
import IconPanelDivider from "../../../UI/Panels/components/IconPanelDivider";

const SubnetWriteForm = ({handleSubmit, reset, t}) => {
    handleSubmit.propTypes = {handleSubmit: PropTypes.func.isRequired};
    reset.propTypes = {reset: PropTypes.func.isRequired};
    t.propTypes = {t: PropTypes.func.isRequired};

    return (
        <Col xs={12} md={12} lg={12} xl={6} cssModule="table">
            <Card>
                <CardBody>
                    {/*<div className="card__title">*/}
                    {/*    <h5 className="bold-text">{t('SUBNET Management')}</h5>*/}
                    {/*    <h5 className="subhead">SUBNET 등록.</h5>*/}
                    {/*</div>*/}
                    <form className="form form--horizontal" onSubmit={handleSubmit}>
                        <DeviceSearch />    {/*장비 검색*/}
                        <div className="form__form-group">
                            <InputIpAddr contents="SUBNET" nameText="subnet_start" holderText="Start"/>
                            <InputIpAddr contents=" ~ " nameText="subnet_end" holderText="End" />
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">SUBNET 태그</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    <WebIcon />
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
                        <InputIpAddr contents="SUBNET 마스크" icon="MailRuIcon" nameText="subnet_mask" holderText="Mask" />
                        <InputIpAddr contents="SUBNET 게이트웨이" icon="MailRuIcon" nameText="subnet_gateway" holderText="Gateway" />
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
