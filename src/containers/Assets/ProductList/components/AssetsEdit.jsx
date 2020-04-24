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

class AssetsEdit extends PureComponent {
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

    onClose = () => {
        const { closeToggle } = this.props;
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

        /* createData('CBS04912', '서버', 'HP', 'DL360p Gen8',
             '0.0.0.0', '고객장비', '고객소유장비', '노퀘어|지케이클로벌', '강남KT-IDC / 06D-06',
             '1U', 'Manage'),*/
        return (
            <div>
                <div className="assets_write__modal__header">
                    <div className="float-right">
                        <br/>
                        <button className="lnr lnr-cross assets_write__modal__close-btn" type="button"
                                onClick={this.onClose}/>
                        {header ? '' : Icon}
                    </div>
                    <div className="float-left">
                        <h5 className="text-modal assets_write__modal__title">{title}</h5>
                    </div>
                    <h5 className="text-modal assets_write__modal__title_bottomLine">&nbsp;</h5>
                </div>
                <div className="assets_write__modal__body">
                    <form className="modal_form modal_form--horizontal">
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_green">장비코드</span>
                            <div className="modal_form__form-group-field">
                                <b><h6 style={deviceStyle}>CBS04912</h6></b>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IDC / 랙번호</span>
                            <div className="modal_form__form-group-field">
                                강남KT-IDC
                                &nbsp;&nbsp;
                                None
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">제조사 / 모델명</span>
                            <div className="modal_form__form-group-field">
                                <select name="">
                                    <option value="">제조사</option>
                                    <option value="">IBM(Lenovo)</option>
                                    <option value="">HP</option>
                                    <option value="">DELL</option>
                                    <option value="">eSilm</option>
                                    <option value="">SuperMicro</option>
                                    <option value="">FUJITSU</option>
                                    <option value="">UNIWIDE</option>
                                    <option value="">조립서버</option>
                                    <option value="">데스크탑</option>
                                    <option value="">CISCO</option>
                                    <option value="">SUN</option>
                                    <option value="">COMPAQ</option>
                                    <option value="">3GEN</option>
                                    <option value="">HITACHI</option>
                                    <option value="">삼성</option>
                                    <option value="">NETGEAR</option>
                                    <option value="">SYNOLOGY</option>
                                    <option value="">ASUS</option>
                                    <option value="">Buffalo</option>
                                    <option value="">QNAP</option>
                                    <option value="">EMC</option>
                                    <option value="">Infortrend</option>
                                    <option value="">블레이드서버</option>
                                    <option value="">Symantec</option>
                                    <option value="">NetApp</option>
                                    <option value="">지란지교시큐리티</option>
                                    <option value="">Quantum</option>
                                    <option value="">Inspur</option>
                                    <option value="">VERITAS</option>
                                    <option value="">Quantum</option>
                                    <option value="">Intel</option>
                                    <option value="">Promise Technology</option>
                                    <option value="">NUTANIX</option>
                                    <option value="">(주)소만사</option>
                                    <option value="">TERATEC</option>
                                    <option value="">Fortinet</option>
                                    <option value="">WAREVALLEY</option>
                                </select>
                                &nbsp;&nbsp;
                                <select name="">
                                    <option value="">모델명</option>
                                </select>
                            </div>
                        </div>
                        {/*---------------------------------------------------------------------------------*/}
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">IP</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="Ip"
                                    component="input"
                                    type="text"
                                    className="input_col_5"
                                    placeholder="ip"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">장비구분</span>
                            <div className="modal_form__form-group-field">
                                서버
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label text_cor_orange">고객사명</span>
                            <div className="modal_form__form-group-field">
                                노퀘어|지케이클로벌
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유권/소유권구분</span>
                            <div className="modal_form__form-group-field">
                                고객장비
                                &nbsp;&nbsp;
                                고객소유장비
                            </div>
                            <span className="modal_form__form-group-description">
                                  Explanation.
                                </span>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">소유업체명</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="rightIcon"
                                    component="input"
                                    type="text"
                                    className="input_col_7"
                                    placeholder="Icon Right Input"
                                />
                                <div className="modal_form__form-group-icon">
                                    <AccountSearchIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HW S/N</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="default"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">CPU</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="CPU"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">MEMORY</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="MEMORY"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                                <span
                                    className="modal_form__form-group-label modal_form_label_blue">HDD</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default"
                                    component="input"
                                    type="text"
                                    className="input_col_10"
                                    placeholder="HDD"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">임대기간</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="interval_date"
                                    className="input_col_5"
                                    component={renderIntervalDatePickerField}
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">입고일</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default_date"
                                    className="input_col_5"
                                    component={renderDatePickerField}
                                />
                                <div className="modal_form__form-group-icon">
                                    <CalendarBlankIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">원가</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default"
                                    component="input"
                                    className="input_col_5"
                                    type="text"
                                    placeholder="원가"
                                />
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">용도</span>
                            <div className="modal_form__form-group-field">
                                <Field
                                    name="default"
                                    component="input"
                                    className="input_col_10"
                                    type="text"
                                    placeholder="용도"
                                />
                            </div>
                        </div>
                        {/*---------------------------------------------------------------------------------*/}
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">SPLA</span>
                            <div className="modal_form__form-group-field">
                                <select name="">
                                    <option value="">선택하세요.</option>
                                    <option value="78">Windows 2008 R2 STD</option>
                                    <option value="79">Windows 2003 STD 32bit</option>
                                    <option value="80">Windows 2008 STD 64bit</option>
                                    <option value="81">Windows 2008 R2 STD 64bit</option>
                                    <option value="82">Windows 2008 STD 32bit</option>
                                    <option value="83">Windows 2012 R2 STD</option>
                                    <option value="84">MS-SQL 2005 STD 32bit</option>
                                    <option value="85">MS-SQL 2008 R2 STD 64bit</option>
                                    <option value="86">windows 2012 STD 64bit</option>
                                    <option value="87">Windows 2012 STD</option>
                                    <option value="88">Windows 2008 R2 STD ENG</option>
                                    <option value="89">MS-SQL 2008 R2 ENT 64bit</option>
                                    <option value="90">MS-SQL 2005 STD 64bit</option>
                                    <option value="91">MS-SQL 2005 Workgroup</option>
                                    <option value="549">Windows 2012 R2 STD ENG</option>
                                    <option value="566">Windows 2012 R2 STD DC</option>
                                    <option value="571">windows 2016 STD 64bit</option>
                                    <option value="587">MS-SQL 2008 STD 64bit</option>
                                    <option value="623">MS-SQL 2014 STD 64bit</option>
                                    <option value="624">MS-SQL 2012 STD 64bit</option>
                                    <option value="625">MS-SQL 2014 ENT 64bit</option>
                                    <option value="626">MS-SQL 2012 ENT 64bit</option>
                                </select>
                                &nbsp;&nbsp;
                                <select name="">
                                    <option value="">선택하세요.</option>
                                    <option value="78">Windows 2008 R2 STD</option>
                                    <option value="79">Windows 2003 STD 32bit</option>
                                    <option value="80">Windows 2008 STD 64bit</option>
                                    <option value="81">Windows 2008 R2 STD 64bit</option>
                                    <option value="82">Windows 2008 STD 32bit</option>
                                    <option value="83">Windows 2012 R2 STD</option>
                                    <option value="84">MS-SQL 2005 STD 32bit</option>
                                    <option value="85">MS-SQL 2008 R2 STD 64bit</option>
                                    <option value="86">windows 2012 STD 64bit</option>
                                    <option value="87">Windows 2012 STD</option>
                                    <option value="88">Windows 2008 R2 STD ENG</option>
                                    <option value="89">MS-SQL 2008 R2 ENT 64bit</option>
                                    <option value="90">MS-SQL 2005 STD 64bit</option>
                                    <option value="91">MS-SQL 2005 Workgroup</option>
                                    <option value="549">Windows 2012 R2 STD ENG</option>
                                    <option value="566">Windows 2012 R2 STD DC</option>
                                    <option value="571">windows 2016 STD 64bit</option>
                                    <option value="587">MS-SQL 2008 STD 64bit</option>
                                    <option value="623">MS-SQL 2014 STD 64bit</option>
                                    <option value="624">MS-SQL 2012 STD 64bit</option>
                                    <option value="625">MS-SQL 2014 ENT 64bit</option>
                                    <option value="626">MS-SQL 2012 ENT 64bit</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal_form__form-group">
                            <span className="modal_form__form-group-label">기타사항</span>
                            <div className="modal_form__form-group-field">
                                <TextEditor onChange={() => {
                                }}/>
                            </div>
                        </div>
                    </form>
                </div>
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

/*export default AssetsEdit;*/
/*
export default function toggleClick() {
    this.toggle();
}*/
export default reduxForm({
    form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(AssetsEdit));
