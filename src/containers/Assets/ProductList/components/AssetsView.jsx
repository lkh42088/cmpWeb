import React, {PureComponent, Fragment} from 'react';
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

import AssetsComment from "./AssetsComment";

//assetState: PropTypes.arrayOf(PropTypes.string).isRequired,
class AssetsView extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        setTotalManager: PropTypes.func.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
        closeToggle: PropTypes.func,
        updateToggle: PropTypes.func,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        // todo deviceCode 사용 처 확인 필요
        deviceCode: PropTypes.string.isRequired,
    };

    static defaultProps = {
        title: '',
        message: '',
        colored: false,
        header: false,
        closeToggle: '',
        updateToggle: '',
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
            submit: {
                type: 'comment',
                division: 'create',
            },
            comment: '',
            registerId: '',
            postType: 'comment',
            postDivision: 'create',
            deviceCode: '',
        };
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        const {setTotalManager} = this.props;

        // eslint-disable-next-line react/destructuring-assignment
        // 상태값을 onCreate 를 통하여 부모에게 전달
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment

        setTotalManager(this.state);

        // 상태 초기화
        this.setState({
            comment: '',
            registerId: '',
            modal: false,
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    commentToggle = () => {
        this.setState(prevState => ({modal: !prevState.modal}));
    };

    onClose = () => {
        const {closeToggle} = this.props;
        closeToggle(); //
    };


    onUpdate = () => {
        const {updateToggle} = this.props;
        updateToggle();
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    /*    componentDidUpdate = (prevProps, prevState) => {
            console.log("♡ VIEW componentDidUpdate");
        };*/

    componentDidMount = () => {
        // 외부 라이브러리 연동: D3, masonry, etc
        // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
        // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
        const {deviceCode} = this.props;
        this.setState({
            deviceCode,
        });
    };

    render() {
        const {assetState, dispatch, setTotalManager} = this.props;
        const {
            title, message, colored, header,
        } = this.props;
        const {modal, comment, submitType} = this.state;
        let Icon;
        let viewModalContent;
        let deviceValue = new Map([]);
        const {showPassword} = this.state;
        //console.log("view render 후에 assetState : ", assetState);

        const deviceStyle = {
            textDecoration: '#ffdd67 underline',
            fontWeight: 'bold',
        };

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': colored,
            'assets_write__modal-dialog--header': header,
        });

        const classNameMap = {
            formDivClass: "modal_form__form-group",
            formSpanClass: "modal_form__form-group-label",
            formDivSubClass: "modal_form__form-group-field",
        };

        if (assetState.device.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            deviceValue = assetState.device[0];
        } else {
            deviceValue = assetState.device;
        }

        const {
            idx, outFlag, commentCnt, commentLastDate, registerId, registerDate,
            deviceCode, model, contents, customer, manufacture, deviceType, warehousingDate,
            rentDate, ownership, ownershipDiv, ownerCompany, hwSn, idc, rack, cost, purpose,
            monitoringFlag, MonitoringMethod, ip, size, spla, cpu, memory, hdd, rackCode, rackTag,
            rackLoc, firmwareVersion, warranty, customerName, ownerCompanyName,
        } = deviceValue;

        switch (assetState.deviceType) {
            case 'server':
                viewModalContent = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                                <span
                                    className="modal_form__form-group-label
                                    modal_form_label_blue">CPU</span>
                            <div className={classNameMap.formDivSubClass}>
                                {cpu}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                                <span
                                    className="modal_form__form-group-label
                                    modal_form_label_blue">MEMORY</span>
                            <div className={classNameMap.formDivSubClass}>
                                {memory}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                                <span
                                    className="modal_form__form-group-label
                                    modal_form_label_blue">HDD</span>
                            <div className={classNameMap.formDivSubClass}>
                                {hdd}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IP</span>
                            <div className={classNameMap.formDivSubClass}>
                                {ip}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Size</span>
                            <div className={classNameMap.formDivSubClass}>
                                {size}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>SPLA</span>
                            <div className={classNameMap.formDivSubClass}>
                                {spla}
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'network':
                viewModalContent = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IP</span>
                            <div className={classNameMap.formDivSubClass}>
                                {ip}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>FirmwareVersion</span>
                            <div className={classNameMap.formDivSubClass}>
                                {firmwareVersion}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>WarehousingDate</span>
                            <div className={classNameMap.formDivSubClass}>
                                {warehousingDate}
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'part':
                viewModalContent = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Warranty</span>
                            <div className={classNameMap.formDivSubClass}>
                                {warranty}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>WarehousingDate</span>
                            <div className={classNameMap.formDivSubClass}>
                                {warehousingDate}
                            </div>
                        </div>
                    </Fragment>
                );
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
                            <span className="modal_form__form-group-label text_cor_green">장비코드</span>
                            <div className="modal_form__form-group-field" style={{display: "block"}}>
                                <div className="float-left">
                                    <b><h6 style={deviceStyle}>{deviceCode}</h6></b>
                                </div>
                                <div className="assets_write__form_comment_confirm float-right"
                                     onClick={this.commentToggle} onKeyDown={this.commentToggle}
                                     role="button" tabIndex="0">+ 댓글 입력
                                </div>
                                <Modal
                                    isOpen={modal}
                                    className={`assets_write__modal-dialog 
                                    assets_write__modal-dialog--success ${modalClass}`}
                                >
                                    <form onSubmit={this.handleSubmit}>
                                        <div
                                            className="assets_write__modal__body assets_write__modal__tableLine">
                                            <div className="modal_form__form-group">
                                            <span className="modal_form__form-group-label text_cor_green">
                                                {/*TODO 로그인 ID*/}
                                                로그인한 ID [2020/12/15]</span>
                                                <div className="modal_form__form-group-field">
                                                    {/* eslint-disable-next-line react/destructuring-assignment */}
                                                    <textarea name="comment" value={comment}
                                                              className="assets_comment"
                                                              placeholder="댓글 입력 창"
                                                              onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <ButtonToolbar className="assets_write__modal__footer_comment">
                                            <Button className="assets_write__modal_ok"
                                                    outline={colored} type="submit"
                                                    color="success">등록</Button>
                                            &nbsp;&nbsp;
                                            <Button className="assets_write__modal_cancel"
                                                    onClick={this.commentToggle}>Cancel</Button>
                                        </ButtonToolbar>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IDC / 랙번호</span>
                            <div className={classNameMap.formDivSubClass}>
                                {idc}
                                &nbsp;&nbsp;
                                {rack}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>제조사 / 모델명</span>
                            <div className={classNameMap.formDivSubClass}>
                                {manufacture}
                                &nbsp;&nbsp;
                                {model}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>장비구분</span>
                            <div className={classNameMap.formDivSubClass}>
                                {deviceType}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className="modal_form__form-group-label text_cor_orange">고객사명</span>
                            <div className={classNameMap.formDivSubClass}>
                                {customerName}/{customer}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>소유권/소유권구분</span>
                            <div className={classNameMap.formDivSubClass}>
                                {ownership}
                            </div>
                            <span className="modal_form__form-group-description">
                                  Explanation.
                            </span>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>소유업체명</span>
                            <div className={classNameMap.formDivSubClass}>
                                {ownerCompanyName}/{ownerCompany}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>임대기간</span>
                            <div className={classNameMap.formDivSubClass}>
                                {rentDate}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>입고일</span>
                            <div className={classNameMap.formDivSubClass}>
                                {warehousingDate}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>원가</span>
                            <div className={classNameMap.formDivSubClass}>
                                {cost}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>용도</span>
                            <div className={classNameMap.formDivSubClass}>
                                {purpose}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                                <span
                                    className="modal_form__form-group-label
                                    modal_form_label_blue">HW S/N</span>
                            <div className={classNameMap.formDivSubClass}>
                                {hwSn}
                            </div>
                        </div>
                        {/*---------------------------------------------------------------------------------*/}
                        {viewModalContent}
                        {/*---------------------------------------------------------------------------------*/}
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>기타사항</span>
                            <div className={classNameMap.formDivSubClass}
                                 dangerouslySetInnerHTML={{__html: contents}}/>
                        </div>
                    </form>
                </div>
                {/*-----------------------------------------------------------------------------------------*/}
                <AssetsComment assetState={assetState} dispatch={dispatch} setTotalManager={setTotalManager}/>
                {/*-----------------------------------------------------------------------------------------*/}
                <ButtonToolbar className="assets_write__modal__footer">
                    <Button className="assets_write__modal_ok" outline={colored} color="primary"
                            onClick={this.onUpdate}>Edit</Button>
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
/*export default reduxForm({
    form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(AssetsView));*/

export default AssetsView;
