import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Table, Badge, Button, ButtonToolbar, Modal,
} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import {withTranslation} from "react-i18next";

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';
import Collapse from "../../../../shared/components/Collapse";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";

class CustomerView extends PureComponent {
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
    }

    commentToggle = () => {
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
                            <div className="modal_form__form-group-field" style={{display: "block"}}>
                                <div className="float-left">
                                    <b><h6 style={deviceStyle}>nubesbridge</h6></b>
                                </div>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">비밀번호</span>
                            <div className="modal_form__form-group-field">
                                *********
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label modal_form_label_blue">서비스명</span>
                            <div className="modal_form__form-group-field">
                                Nubes-Bridge
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label modal_form_label_blue">회사명</span>
                            <div className="modal_form__form-group-field">
                                Nubes-Bridge
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">E-MAIL</span>
                            <div className="modal_form__form-group-field">
                                support@nubes-bridge.com
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label ">홈페이지</span>
                            <div className="modal_form__form-group-field">
                                http://nubes-bridge.com/
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">대표전화</span>
                            <div className="modal_form__form-group-field">
                                02-000-0000
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">주소</span>
                            <div className="modal_form__form-group-field">
                                06253 310, Gangnam-daero, Gangnam-gu, Seoul, Republic of Korea 1510
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label ">메모</span>
                            <div className="modal_form__form-group-field">
                                20151215 해지
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label ">해지일자</span>
                            <div className="modal_form__form-group-field">
                                20151215
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label ">접근차단일자</span>
                            <div className="modal_form__form-group-field">
                                -
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label ">누적통계 여부</span>
                            <div className="modal_form__form-group-field">
                                사용
                            </div>
                        </div>
                    </form>
                </div>

                <div className="float-right">
                    <Badge className="badge_btn badge-light" type="button"
                           onClick={this.commentToggle} onKeyDown={this.commentToggle}
                           role="button" tabIndex="0">담당자 추가</Badge>
                    <Badge className="badge_btn badge-light">[회사명] 담당자 추가</Badge>
                    <Badge className="badge_btn badge-light">서비스 추가</Badge>
                </div>
                {/*-------------------------------------------------------------------Modal*/}
                <Modal
                    isOpen={modal}
                    /*toggle={this.commentToggle}*/
                    className={`assets_write__modal-dialog assets_write__modal-dialog--success ${modalClass}`}
                >
                    <div className="assets_write__modal__body">
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_green">담당자 등록</span>
                            <div className="modal_form__form-group-field">

                                <div className="assets_write__modal__body assets_write__modal__tableLine">
                                    <form className="modal_form modal_form--horizontal">
                                        <div className="modal_form__form-group">
                                            <span className="modal_form__form-group-label">회사명</span>
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
                                            <span
                                                className="modal_form__form-group-label">이름</span>
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
                                            <span className="modal_form__form-group-label">직위</span>
                                            <div className="modal_form__form-group-field">
                                                <select name="" className="select_col_2">
                                                    <option value="">선택하세요.</option>
                                                    <option value="Y">기술</option>
                                                </select>
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
                                            <span className="modal_form__form-group-label">휴대전화</span>
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
                                            <span className="modal_form__form-group-label">부서</span>
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
                                            <span className="modal_form__form-group-label">업무구분</span>
                                            <div className="modal_form__form-group-field">
                                                <select name="" className="select_col_2">
                                                    <option value="">선택하세요.</option>
                                                    <option value="Y">기술</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonToolbar className="assets_write__modal__footer_comment">
                        <Button className="assets_write__modal_ok" outline={colored}
                                color="success"
                                onClick={this.commentToggle}>Submit</Button>&nbsp;&nbsp;
                        <Button className="assets_write__modal_cancel"
                                onClick={this.commentToggle}>Cancel</Button>
                    </ButtonToolbar>
                </Modal>

                <br/>
                {/*-------------------------------------------------------따로 COMPONENT 로 분리 할 필요 있음*/}
                <Collapse title="담당자 정보"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                    <span>▶ Explanation</span>
                    <Table className="table--bordered" responsive>
                        <thead>
                        <tr>
                            <th>이름</th>
                            <th>전화번호/휴대전화</th>
                            <th>이메일</th>
                            <th>부서</th>
                            <th>회사</th>

                            <th>담당업무</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>홍길동</td>
                            <td>02-000-0000/010-0000-0000</td>
                            <td>suport@nubes-bridge.com</td>
                            <td>개발팀</td>
                            <td>(주)누베스 브릿지</td>

                            <td>개발</td>
                        </tr>
                        </tbody>
                    </Table>
                </Collapse>
                <Collapse title="[회사명] 담당자 정보"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                    <span>▶ Explanation</span>
                    <Table className="table--bordered" responsive>
                        <thead>
                        <tr>
                            <th>이름</th>
                            <th>구분</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>전화번호/휴대전화</th>

                            <th>이메일</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>세종대왕</td>
                            <td>기술</td>
                            <td>연구팀</td>
                            <td>CEO</td>
                            <td>02-000-0000/010-0000-0000</td>

                            <td>suport@nubes-bridge.com</td>
                        </tr>
                        </tbody>
                    </Table>
                </Collapse>
                <Collapse title="서비스 정보"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                    <span>▶ Explanation</span>
                    <Table className="table--bordered" responsive>
                        <thead>
                        <tr>
                            <th>서비스 구분</th>
                            <th>도메인</th>
                            <th>IP</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>VOD</td>
                            <td>vod.exampolice.co.kr...</td>
                            <td>
                                0.0.0.0 <br/>
                                1.0.0.0 <br/>
                                2.0.0.0 <br/>
                                3.0.0.0 <br/>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Collapse>

                <ButtonToolbar className="assets_write__modal__footer">
                    <Button className="assets_write__modal_ok" outline={colored} color="primary"
                            onClick={this.onClose}>Edit</Button>
                    <Button className="assets_write__modal_cancel"
                            onClick={this.onClose}>Cancel</Button>
                </ButtonToolbar>

            </div>
        );
    }
}

/*export default AssetsView;*/
/*
export default function toggleClick() {
    this.toggle();
}*/
export default reduxForm({
    form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(CustomerView));
