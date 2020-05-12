import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import classNames from 'classnames';
import {Field, reduxForm} from "redux-form";
import {withTranslation} from "react-i18next";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import AccountSearchIcon from "mdi-react/AccountSearchIcon";

import {RTLProps} from '../../../../shared/prop-types/ReducerProps';

import TextEditor from "../../../../shared/components/text-editor/TextEditor";
import renderIntervalDatePickerField from "../../../../shared/components/form/IntervalDatePicker";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import Collapse from "../../../../shared/components/Collapse";

//assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
class AssetsView extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        closeToggle: PropTypes.func,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        title: '',
        message: '',
        colored: false,
        header: false,
        closeToggle: '',
    };

    constructor() {
        console.log("constructor");
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

    showComment = () => {
        console.log("옴마나@");
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    render() {
        console.log("render");
        const {assetState, dispatch} = this.props;
        const {
            title, message, colored, header,
        } = this.props;
        const {modal} = this.state;
        let Icon;
        let deviceValue = new Map([]);
        const {showPassword} = this.state;
        console.log("view render 후에 assetState : ", assetState);

        const deviceStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
        };

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': colored,
            'assets_write__modal-dialog--header': header,
        });

        if (assetState.device.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            deviceValue = assetState.device[0];
        } else {
            deviceValue = assetState.device;
        }

        const {
            Idx, OutFlag, Num, CommentCnt, CommentLastDate, Option, Hit,
            RegisterId, Password, RegisterName, RegisterEmail, RegisterDate,
            DeviceCode, Model, Contents, Customer, Manufacture, DeviceType,
            WarehousingDate, RentDate, Ownership, OwnerCompany, HwSn, IDC,
            Rack, Cost, Purpos, Ip, Size, Spla, Cpu, Memory, Hdd,
            FirmwareVersion, Warranty, MonitoringFlag, MonitoringMethod,
        } = deviceValue;


        /*switch (color) {
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
        }*/

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
                            <span className="modal_form__form-group-label text_cor_green">장비코드</span>
                            <div className="modal_form__form-group-field" style={{display: "block"}}>
                                <div className="float-left">
                                    <b><h6 style={deviceStyle}>{DeviceCode}</h6></b>
                                </div>
                                <div className="assets_write__form_comment_confirm float-right" type="button"
                                     onClick={this.commentToggle} onKeyDown={this.commentToggle}
                                     role="button" tabIndex="0">+ 댓글 입력
                                </div>
                                <Modal
                                    isOpen={modal}
                                    /*toggle={this.commentToggle}*/
                                    className={`assets_write__modal-dialog 
                                    assets_write__modal-dialog--success ${modalClass}`}
                                >
                                    <div className="assets_write__modal__body assets_write__modal__tableLine">
                                        <div className="modal_form__form-group">
                                            <span className="modal_form__form-group-label text_cor_green">
                                                작성자 [2020/12/15]</span>
                                            <div className="modal_form__form-group-field">
                                                <textarea name="" className="assets_comment"
                                                          placeholder="댓글 입력 창"/>
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
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IDC / 랙번호</span>
                            <div className="modal_form__form-group-field">
                                {IDC}
                                &nbsp;&nbsp;
                                {Rack}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">제조사 / 모델명</span>
                            <div className="modal_form__form-group-field">
                                {Manufacture}
                                &nbsp;&nbsp;
                                {Model}
                            </div>
                        </div>
                        {/*---------------------------------------------------------------------------------*/}
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                {Ip}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">장비구분</span>
                            <div className="modal_form__form-group-field">
                                {DeviceType}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_orange">고객사명</span>
                            <div className="modal_form__form-group-field">
                                {Customer}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유권/소유권구분</span>
                            <div className="modal_form__form-group-field">
                                {Ownership}
                            </div>
                            <span className="modal_form__form-group-description">
                                  Explanation.
                            </span>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유업체명</span>
                            <div className="modal_form__form-group-field">
                                {OwnerCompany}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HW S/N</span>
                            <div className="modal_form__form-group-field">
                                {HwSn}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">CPU</span>
                            <div className="modal_form__form-group-field">
                                {Cpu}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">MEMORY</span>
                            <div className="modal_form__form-group-field">
                                {Memory}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HDD</span>
                            <div className="modal_form__form-group-field">
                                {Hdd}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">임대기간</span>
                            <div className="modal_form__form-group-field">
                                {RentDate}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">입고일</span>
                            <div className="modal_form__form-group-field">
                                20141112
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">원가</span>
                            <div className="modal_form__form-group-field">
                                {Cost}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">용도</span>
                            <div className="modal_form__form-group-field">
                                {Purpos}
                            </div>
                        </div>
                        {/*---------------------------------------------------------------------------------*/}
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">SPLA</span>
                            <div className="modal_form__form-group-field">
                                {Spla}
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">기타사항</span>
                            <div className="modal_form__form-group-field">
                                {Contents}
                            </div>
                        </div>
                    </form>
                </div>
                <br/>
                {/*TODO 댓글 컴포넌트 만들기*/}
                {/*<Collapse title="댓글 확인"
                          className="with-shadow modal_comment_register assets_write__modal__tableLine">
                    <span>▶ 작성자 A [2020/04/03]</span>
                    <div className="modal_comment_del">삭제</div>
                    <div className="modal_comment_edit">수정</div>
                    <pre>
담당자(류영동) /data2 파티션 분할 구성 요청
<br/>/dev/sdb1 - /data2 (20T)
<br/>/dev/sdb2 - /data3 : 나머지(23.T ≒ 24T)
<br/>
<br/>*용량 표시 단위로 인한 차이
<br/>&nbsp;1&nbsp; &nbsp; &nbsp; &nbsp;  2048&nbsp; 42949672959&nbsp; &nbsp;  20T&nbsp; Microsoft basic data2
<br/>&nbsp;2&nbsp; 42949672960&nbsp; 93746886655&nbsp;  23.7T&nbsp; Microsoft basic data3
<br/>Disk /dev/sdb: 47998.4 GB, 47998407016448 bytes, 93746888704
                        </pre>
                    <span>▶ 작성자 B [2020/04/02]</span>
                    <pre>
root 패스워드 초기화 요청 처리
                        </pre>
                </Collapse>*/}

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
})(withTranslation('common')(AssetsView));
