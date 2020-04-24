import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Badge, Button, ButtonToolbar, Card, CardBody, Col, Collapse, Modal, Table,
} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import {withTranslation} from "react-i18next";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import AccountSearchIcon from "mdi-react/AccountSearchIcon";
import {TextField} from "@material-ui/core";

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

import renderIntervalDatePickerField from "../../../../shared/components/form/IntervalDatePicker";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";

class CustomerWrite extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        modalType: PropTypes.string,
        closeToggle: PropTypes.func,
        color: PropTypes.string.isRequired,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        btn: PropTypes.string.isRequired,
        rtl: RTLProps.isRequired,
    };

    static defaultProps = {
        title: '',
        message: '',
        modalType: 'write',
        colored: false,
        header: false,
        closeToggle: '',
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
        };
        //this.onClose = this.onClose.bind(this);
    }

    /*    handleClose = () => {
            const { closeToggle } = this.props;
            closeToggle(); //
        };*/

    searchToggle = () => {
        this.setState(prevState => ({modal: !prevState.modal}));
    };

    onClose = () => {
        const {closeToggle} = this.props;
        closeToggle(); //
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    render() {
        const {
            color, btn, title, message, colored, header, rtl, modalType,
        } = this.props;
        const {modal} = this.state;
        let Icon;
        const {showPassword} = this.state;

        const deviceStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
        };

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': colored,
            'assets_write__modal-dialog--header': header,
        });

        switch (color) {
            case 'primary':
                Icon = <span className="lnr lnr-pushpin assets_write__modal__title-icon"/>;
                break;
            case 'success':
                Icon = <span className="lnr lnr-thumbs-up assets_write__modal__title-icon"/>;
                break;
            case 'warning':
                Icon = <span className="lnr lnr-flag assets_write__modal__title-icon"/>;
                break;
            case 'danger':
                Icon = <span className="lnr lnr-cross-circle assets_write__modal__title-icon"/>;
                break;
            default:
                break;
        }

        return (
            <div>
                <div className="assets_write__modal__header">
                    <p className="text-modal assets_write__modal__title">{title}
                        &nbsp;&nbsp;
                        <span className="assets_write__modal__title_sub">{message}</span></p>
                    <button className="lnr lnr-cross assets_write__modal__close-btn" type="button"
                            onClick={this.onClose}/>
                    {header ? '' : Icon}
                </div>
                <div className="assets_write__modal__body assets_write__modal__tableLine">
                    <form className="modal_form modal_form--horizontal">
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_green">ID</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="id"
                                    component="input"
                                    type="text"
                                    className="input_col_3"
                                    placeholder="id"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">비밀번호</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="password"
                                    component="input"
                                    type="password"
                                    className="input_col_5"
                                    placeholder="password"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label modal_form_label_blue">서비스명</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="service"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="service"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label modal_form_label_blue">회사명</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="company"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="company"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">E-MAIL</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="mail"
                                    component="input"
                                    type="text"
                                    className="input_col_7"
                                    placeholder="mail"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">홈페이지</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="homepage"
                                    component="input"
                                    type="text"
                                    className="input_col_7"
                                    placeholder="homepage"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">대표전화</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="tel"
                                    component="input"
                                    type="text"
                                    className="input_col_3"
                                    placeholder="tel"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">주소</span>
                            <div className="modal_form__form-group-field" style={{paddingBottom: '3px', paddingTop: '3px'}}>
                                <Field
                                    name="zipcode"
                                    component="input"
                                    type="text"
                                    className="input_col_2"
                                    placeholder="zipcode"
                                />
                                <Badge className="search_btn" style={{lineHeight: '1.5'}}>검색</Badge>
                            </div>
                            <div className="modal_form__form-group-field" style={{paddingBottom: '3px', paddingTop: '3px'}}>
                                <Field
                                    name="addr1"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="addr1"
                                />
                            </div>
                            <br/>
                            <div className="modal_form__form-group-field" style={{paddingBottom: '3px', paddingTop: '3px'}}>
                                <Field
                                    name="addr2"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="addr2"
                                />
                            </div>
                            <span className="modal_form__form-group-description">
                                  ex) 5동 1404호
                            </span>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">메모</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="textarea"
                                    component="textarea"
                                    type="text"
                                />
                                {/*<TextField/>*/}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">해지일자</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="mb_termination_date"
                                    className="input_col_5"
                                    component={renderDatePickerField}
                                />
                            </div>
                            <span className="modal_form__form-group-description">
                                  ex) 20151215
                            </span>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">접근차단일자</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="mb_blockAccess_date"
                                    className="input_col_5"
                                    component={renderDatePickerField}
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">누적통계 여부</span>
                            <div className="modal_form__form-group-field">
                                <select name="" className="select_col_2">
                                    <option value="">선택하세요.</option>
                                    <option value="Y">사용</option>
                                    <option value="N">미사용</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                ※ ID는 한번 등록하면 수정할 수 없습니다.
                <ButtonToolbar className="assets_write__modal__footer">
                    <Button className="assets_write__modal_ok" outline={colored} color="primary"
                            onClick={this.onClose}>Submit</Button>
                    <Button className="assets_write__modal_cancel"
                            onClick={this.onClose}>Cancel</Button>{' '}
                </ButtonToolbar>
            </div>
        );
    }
}

/*export default CustomerWrite;*/
export default reduxForm({
    form: 'customer_form',
})(withTranslation('common')(CustomerWrite));
