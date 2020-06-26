import React, {Fragment, PureComponent} from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Modal,
} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import classNames from "classnames";
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import moment from "moment";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AssetsComment from "./AssetsComment";
import AssetsLog from "./AssetsLog";
import {
    getDeviceByIdx, getDeviceOriByIdx,
    postDevice,
    postDeviceComment,
    setAssetsPage,
    setDeviceLog,
} from "../../../../redux/actions/assetsAction";
import AssetsEdit from "./AssetsEdit";

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
            modalOpenFlag: false,
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

    handleSubmitEdit = (values) => {
        const {assetState, dispatch} = this.props;
        dispatch(setAssetsPage('view'));

        let division = '|';
        let divisionCount = 0;
        let IpArray = '';
        let SplaArray = '';
        let rentDataStart;
        let rentDataEnd;
        let rentData = '|';
        let warehousingDate = '';

        console.log("👋 assetState.deviceIp : ", assetState.deviceIp);

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceIp) {
            console.log("👋👋 assetState.deviceIp[arrData] : ", assetState.deviceIp[arrData]);
            if (assetState.deviceIp[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                IpArray = `${IpArray}${division}${assetState.deviceIp[arrData]}`;
            }
        }

        divisionCount = 0;
        IpArray = `${IpArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in assetState.deviceSpla) {
            if (assetState.deviceSpla[arrData] !== '') {
                if (divisionCount <= 0) {
                    division = '';
                } else {
                    division = '|';
                }

                divisionCount += 1;
                SplaArray = `${SplaArray}${division}${assetState.deviceSpla[arrData]}`;
            }
        }

        SplaArray = `${SplaArray}|`;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in values) {
            if (arrData.indexOf("rentDate") !== -1) {
                if (values[arrData].start !== undefined) {
                    rentDataStart = moment(values[arrData].start).format("YYYYMMDD");
                    rentDataEnd = `|${moment(values[arrData].end).format("YYYYMMDD")}`;
                    rentData = `${rentDataStart}${rentDataEnd}`;
                } else if (values[arrData] !== '' && values[arrData] !== undefined) {
                    rentData = values[arrData];
                } else {
                    rentData = "|";
                }
            } else if (arrData.indexOf("warehousingDate") !== -1) {
                warehousingDate = moment(values[arrData]).format("YYYYMMDD");
            }
        }

        warehousingDate = warehousingDate.toString();

        let rackLog;

        if (values.rackLoc !== undefined) {
            rackLog = values.rackLoc.toString();
        } else {
            rackLog = 0;
        }

        const submitData = ({
            deviceCode: values.deviceCode,
            idx: values.idx,
            outFlag: '',
            commentCnt: '',
            commentLastDate: '',
            registerId: 'lkb',
            registerDate: '',
            model: values.model,
            contents: values.contents,
            customer: values.customer,
            manufacture: values.manufacture,
            deviceType: values.deviceType,
            ownership: values.ownership,
            ownershipDiv: values.ownershipDiv,
            ownerCompany: values.ownerCompany,
            hwSn: values.hwSn,
            idc: values.idc,
            rack: values.rack,
            cost: values.cost,
            purpose: values.purpose,
            size: values.size,
            cpu: values.cpu,
            memory: values.memory,
            hdd: values.hdd,
            rackTag: values.rackTag,
            rackLog,
            ip: IpArray,
            spla: SplaArray,
            rentDate: rentData,
            warehousingDate,
            monitoringFlag: '',
            monitoringMethod: '',
            rackCode: values.rackCode,
            firmwareVersion: values.firmwareVersion,
            warranty: values.warranty,
        });

        console.log("UPDATE 🙊🙊🙊 가공 전 : ", values);
        console.log("UPDATE 🙊🙊🙊 가공 후 : ", submitData);
        dispatch(postDevice('update', assetState, submitData));
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

    onUpdate = (deviceCode) => {
        const {assetState, dispatch} = this.props;

        dispatch(getDeviceOriByIdx(deviceCode, assetState.deviceType));
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
        const {
            modal, comment, submitType, modalOpenFlag,
        } = this.state;
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
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{
                                fontSize: "theme.typography.pxToRem(15)",
                                fontWeight: "theme.typography.fontWeightRegular",
                            }}>장비 상세 정보</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
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
                                <ButtonToolbar className="assets_write__modal__footer">
                                    <Button className="assets_write__modal_ok" outline={colored} color="primary"
                                            onClick={event => this.onUpdate(deviceCode)}>수정</Button>
                                    <Button className="assets_write__modal_cancel"
                                            onClick={this.onList}>목록</Button>
                                </ButtonToolbar>
                            </CardBody>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography style={{
                                fontSize: "theme.typography.pxToRem(15)",
                                fontWeight: "theme.typography.fontWeightRegular",
                            }}>장비 댓글</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <AssetsComment assetState={assetState} dispatch={dispatch}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography style={{
                                fontSize: "theme.typography.pxToRem(15)",
                                fontWeight: "theme.typography.fontWeightRegular",
                            }}>장비 로그</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <AssetsLog assetState={assetState} dispatch={dispatch}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Modal
                        isOpen={assetState.assetsPage === 'edit'}
                        modalClassName="ltr-support"
                        className="assets_write__modal-dialog
                            assets_write__modal-dialog">
                        <AssetsEdit assetState={assetState} dispatch={dispatch}
                                    onSubmit={this.handleSubmitEdit}/>
                    </Modal>

                    {/*<AssetsComment assetState={assetState} dispatch={dispatch}/>*/}
                    {/*<AssetsLog assetState={assetState} dispatch={dispatch}/>*/}
                    {/*------------------------------------------------------------------------------------*/}
                    {/*------------------------------------------------------------------------------------*/}
                </Card>
            </Col>
        );
    }
}

export default reduxForm({
    form: 'horizontal_form', // a unique identifier for this form
})(withTranslation('common')(AssetsView));
