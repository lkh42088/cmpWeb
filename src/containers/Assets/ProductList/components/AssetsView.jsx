import React, {Fragment, PureComponent} from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Modal,
} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import classNames from "classnames";
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

import AssetsComment from "./AssetsComment";
import AssetsLog from "./AssetsLog";
import {postDeviceComment, setAssetsPage} from "../../../../redux/actions/assetsAction";

class AssetsView extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
        colored: PropTypes.bool,
        header: PropTypes.bool,
    };


    static defaultProps = {
        title: '',
        message: '',
        colored: false,
        header: false,
    };

    constructor() {
        super();
        this.state = {
            modal: false,
            showPassword: false,
            comment: '',
            registerId: '',
        };
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        //const {setTotalManager} = this.props;

        // eslint-disable-next-line react/destructuring-assignment
        // 상태값을 onCreate 를 통하여 부모에게 전달
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment

        //setTotalManager(this.state);
        const {assetState, dispatch} = this.props;
        const {
            modal, comment, registerId,
        } = this.state;

        const submitData = ({
            idx: '',
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: 'lkb',
            contents: comment,
            deviceCode: assetState.deviceByDeviceCode,
        });
        dispatch(postDeviceComment('create', assetState, submitData));


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

    onList = () => {
        const {assetState, dispatch} = this.props;
        dispatch(setAssetsPage('list'));
    };

    onUpdate = () => {
        /*const {updateToggle} = this.props;
        updateToggle();*/
        const {assetState, dispatch} = this.props;
        dispatch(setAssetsPage('edit'));
    };

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    };

    render() {
        const {assetState, dispatch} = this.props;
        const {
            title, message, colored, header,
        } = this.props;
        const {modal, comment, submitType} = this.state;
        let Icon;
        let viewModalContentLeft;
        let viewModalContentRight;
        let deviceValue = new Map([]);
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

        const classNameMap = {
            formDivClass: "form__form-group",
            formSpanClass: "form__form-group-label",
            formDivSubClass: "form__form-group-field",
        };

        if (assetState.device.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            deviceValue = assetState.device[0];
        } else {
            deviceValue = assetState.device;
        }

        const {
            deviceCode, model, contents, customer, manufacture, deviceType, warehousingDate,
            rentDate, ownership, ownershipDiv, ownerCompany, hwSn, idc, rack, cost, purpose,
            monitoringFlag, MonitoringMethod, ip, size, spla, cpu, memory, hdd, rackCode, rackTag,
            rackLoc, firmwareVersion, warranty, customerName, ownerCompanyName,
        } = deviceValue;

        let ipSliceStr;
        let splaSliceStr;
        let rentDateSliceStr;

        if (ip !== undefined) {
            ipSliceStr = ip.replace(/\|/gi, ", ").slice(0, -2);
        } else {
            ipSliceStr = "";
        }

        if (spla !== undefined) {
            splaSliceStr = spla.replace(/\|/gi, ", ").slice(0, -2);
        } else {
            splaSliceStr = "";
        }

        if (rentDate === "|") {
            rentDateSliceStr = "";
        } else {
            rentDateSliceStr = rentDate;
        }

        switch (assetState.deviceType) {
            case 'server':
                viewModalContentLeft = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>CPU</span>
                            <div className={classNameMap.formDivSubClass}>
                                {cpu}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>MEMORY</span>
                            <div className={classNameMap.formDivSubClass}>
                                {memory}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>HDD</span>
                            <div className={classNameMap.formDivSubClass}>
                                {hdd}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Size</span>
                            <div className={classNameMap.formDivSubClass}>
                                {size}
                            </div>
                        </div>
                    </Fragment>
                );

                viewModalContentRight = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IP</span>
                            <div className={classNameMap.formDivSubClass}>
                                {ipSliceStr}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>SPLA</span>
                            <div className={classNameMap.formDivSubClass}>
                                {splaSliceStr}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Tag</span>
                            <div className={classNameMap.formDivSubClass}>
                                {rackTag}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Location</span>
                            <div className={classNameMap.formDivSubClass}>
                                {rackLoc}
                            </div>
                        </div>
                    </Fragment>
                );

                break;
            case 'network':
                viewModalContentLeft = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>FIRMWARE VERSION</span>
                            <div className={classNameMap.formDivSubClass}>
                                {firmwareVersion}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Tag</span>
                            <div className={classNameMap.formDivSubClass}>
                                {rackTag}
                            </div>
                        </div>
                    </Fragment>
                );

                viewModalContentRight = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>IP</span>
                            <div className={classNameMap.formDivSubClass}>
                                {ipSliceStr}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Location</span>
                            <div className={classNameMap.formDivSubClass}>
                                {rackLoc}
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'part':
                viewModalContentLeft = (
                    <Fragment>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Warranty</span>
                            <div className={classNameMap.formDivSubClass}>
                                {warranty}
                            </div>
                        </div>
                        <div className={classNameMap.formDivClass}>
                            <span className={classNameMap.formSpanClass}>Rack Size</span>
                            <div className={classNameMap.formDivSubClass}>
                                {rackCode}
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            default:
                break;
        }

        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">{title}</h5>
                            <h5 className="subhead">{message}</h5>
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
                                        <Button className="assets_write__modal_ok" color="primary"
                                                outline={colored} type="submit">등록</Button>
                                        &nbsp;&nbsp;
                                        <Button className="assets_write__modal_cancel"
                                                onClick={this.commentToggle}>닫기</Button>
                                    </ButtonToolbar>
                                </form>
                            </Modal>
                        </div>
                        <form className="form form--horizontal">
                            <div className="form__half">
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>장비코드</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        <b><h6 style={deviceStyle}>{deviceCode}</h6></b>
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>장비구분</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {deviceType}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>고객사</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {customerName}/{customer}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>소유업체명</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {ownerCompanyName}/{ownerCompany}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>HW S/N</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {hwSn}
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
                                {viewModalContentLeft}
                            </div>
                            <div className="form__half">
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>IDC / 랙번호</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {idc}/{rack}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>제조사 / 모델명</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {manufacture}/{model}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>소유권/소유권구분</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {ownership}/{ownershipDiv}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>임대기간</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {rentDateSliceStr}
                                    </div>
                                </div>
                                <div className={classNameMap.formDivClass}>
                                    <span className={classNameMap.formSpanClass}>입고일</span>
                                    <div className={classNameMap.formDivSubClass}>
                                        {warehousingDate}
                                    </div>
                                </div>
                                {viewModalContentRight}
                            </div>
                            <div className={classNameMap.formDivClass}>
                                <span className={classNameMap.formSpanClass}>기타사항</span>
                                <div className={classNameMap.formDivSubClass}
                                     dangerouslySetInnerHTML={{__html: contents}}/>
                            </div>
                        </form>
                    </CardBody>
                    <ButtonToolbar className="assets_write__modal__footer">
                        <Button className="assets_write__modal_ok" outline={colored} color="primary"
                                onClick={this.onUpdate}>수정</Button>
                        <Button className="assets_write__modal_cancel"
                                onClick={this.onList}>목록</Button>
                    </ButtonToolbar>
                    {/*-----------------------------------------------------------------------------------------*/}
                    <AssetsComment assetState={assetState} dispatch={dispatch}/>
                    <AssetsLog assetState={assetState} dispatch={dispatch}/>
                    {/*-----------------------------------------------------------------------------------------*/}
                </Card>
            </Col>
        );
    }
}

export default reduxForm({
    form: 'horizontal_form', // a unique identifier for this form
})(withTranslation('common')(AssetsView));
