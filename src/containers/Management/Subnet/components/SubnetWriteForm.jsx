import React, { PureComponent } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import FeedbackIcon from 'mdi-react/FeedbackIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MailRuIcon from 'mdi-react/MailRuIcon';
import WebIcon from 'mdi-react/WebIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';

class SubnetWriteForm extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            showPassword: false,
            searchDevice: false,
        };
    }

    searchDevice = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ searchDevice: !prevState.searchDevice }));
    };

    render() {
        const { handleSubmit, reset, t } = this.props;
        const { showPassword } = this.state;
        const { searchDevice } = this.state;

        return (
            <Col xs={12} md={12} lg={12} xl={6}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">{t('SUBNET Management')}</h5>
                            <h5 className="subhead">SUBNET 등록.</h5>
                        </div>
                        <form className="form form--horizontal" onSubmit={handleSubmit}>
                            <div className="form__form-group">
                                <span className="form__form-group-label">DEIVCE 검색</span>
                                <div className="form__form-group-field">
                                    <div className="form__form-group-icon">
                                        <AccountOutlineIcon />
                                    </div>
                                    <Field
                                        name="user_name"
                                        component="input"
                                        type="text"
                                        placeholder="Device Code"
                                    />
                                    <button
                                        type="button"
                                        className={`form__form-group-button${searchDevice ? ' active' : ''}`}
                                        onClick={e => this.searchDevice(e)}
                                    ><FeedbackIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">SUBNET</span>
                                <div className="form__form-group-field">
                                    <div className="form__form-group-icon">
                                        <MailRuIcon />
                                    </div>
                                    <Field
                                        name="subnet_start"
                                        component="input"
                                        type="ip"
                                        placeholder="Start"
                                    />
                                    <b> ~ </b>
                                    <Field
                                        name="subnet_end"
                                        component="input"
                                        type="ip"
                                        placeholder="End"
                                    />
                                </div>
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
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">SUBNET 마스크</span>
                                <div className="form__form-group-field">
                                    <div className="form__form-group-icon">
                                        <MailRuIcon />
                                    </div>
                                    <Field
                                        name="subnet_mask"
                                        component="input"
                                        type="ip"
                                        placeholder="Mask"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">SUBNET 게이트웨이</span>
                                <div className="form__form-group-field">
                                    <div className="form__form-group-icon">
                                        <MailRuIcon />
                                    </div>
                                    <Field
                                        name="subnet_gateway"
                                        component="input"
                                        type="ip"
                                        placeholder="Gateway"
                                    />
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
    }
}

export default reduxForm({
    form: 'horizontal_form_layout_with_icons', // a unique identifier for this form
})(withTranslation('common')(SubnetWriteForm));
