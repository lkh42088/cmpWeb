import React, {Fragment, PureComponent} from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar, Modal,
} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import classNames from "classnames";
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import moment from "moment";
import MatButton from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";

import AssetsComment from "./AssetsComment";
import AssetsLog from "./AssetsLog";
import {
    getDeviceByIdx, getDeviceOriByIdx, setDeviceLog, setState,
    postDevice, postDeviceComment, setAssetsPage,
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
            date: moment(new Date()).format("YYYY-MM-DD"),

            modalWarring: false,
            warringTitle: '',
            warringContents: '',
            warringClass: 'modal-dialog--danger',
            warringType: '',
            warringStyle: {
                backgroundColor: "",
            },
            warringIcon: '',
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.assetState.stateVal.type === 'device') {
            switch (nextProps.assetState.stateVal.state) {
                case 'confirm':
                    return {
                        modalWarring: false,
                        warringTitle: '',
                        warringContents: '',
                        warringClass: '',
                        warringType: '',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                case 'request':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '수정하시겠습니까?',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                case 'success':
                    return {
                        modalWarring: true,
                        warringTitle: '확인',
                        warringContents: '요청하신 작업에 성공하였습니다.',
                        warringClass: 'modal-dialog--primary',
                        warringType: 'success',
                        warringStyle: {
                            backgroundColor: "#43a047",
                        },
                        warringIcon: <CheckCircleIcon/>,
                    };
                case 'error':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '요청하신 작업에 실패하였습니다.',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                default:
                    break;
            }
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    };

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        //const {setTotalManager} = this.props;

        // eslint-disable-next-line react/destructuring-assignment
        // 상태값을 onCreate 를 통하여 부모에게 전달
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment

        //setTotalManager(this.state);
        const {assetState, dispatch, user} = this.props;
        const {
            modal, comment, registerId,
        } = this.state;

        const submitData = ({
            idx: '',
            /*registerId: data.registerId,*/ //TODO 로그인한 ID
            registerId: user.id,
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
        const {assetState, dispatch, user} = this.props;
        dispatch(setAssetsPage('view'));

        let division = '|';
        let divisionCount = 0;
        let IpArray = '';
        let SplaArray = '';
        let rentDataStart;
        let rentDataEnd;
        let rentData = '|';
        let warehousingDate = '';

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
            registerId: user.id,
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

    warringToggle = (e) => {
        const {dispatch} = this.props;

        const stateVal = ({
            type: 'device',
            division: 'outFlag',
            state: 'confirm',
        });

        dispatch(setState(stateVal));
    };

    render() {
        const {
            assetState, dispatch, user,
            title, message, colored, header,
        } = this.props;

        const {
            modal, comment, date, modalOpenFlag,
            modalWarring, warringTitle, warringContents, warringClass, warringType,
            warringStyle, warringIcon,
        } = this.state;

        let viewModalContentLeft;
        let viewModalContentRight;
        let viewModalContent;
        let deviceValue = new Map([]);

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
            rowFormItem: "row form-infor__item",
            itemContainer: "item-container",
            formInforLabel: "form-infor__label",
            formControlValue: "form-control-value",
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
                viewModalContent = (
                    <Fragment>
                        <div className="row wrapper-source-content">
                            <div className="prefix-content__column">
                                <div className="row form-infor__item_sub">
                                    <div className="item-container">
                                        <div className="form-infor__label">CPU</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className="form-control-value">
                                            {cpu}&nbsp;</div>
                                    </div>
                                </div>
                                <div className="row form-infor__item_sub">
                                    <div className="item-container">
                                        <div className="form-infor__label">MEMORY</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className="form-control-value">
                                            {memory}&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                            <div className="prefix-content__column">
                                <div className="source__column">
                                    <div className="form-infor__label item-container">
                                        IP
                                    </div>
                                </div>
                                <div
                                    className="source-list__column column-source list-sources">
                                    <div className="list-checkbox checkboxes-add">
                                        <span className="custom-control-description">1</span>
                                        <span className="custom-control-description">2</span>
                                        <span className="custom-control-description">3</span>
                                        <span className="custom-control-description">4</span>
                                        <span className="custom-control-description">5</span>
                                        <span className="custom-control-description">6</span>
                                        <span className="custom-control-description">7</span>
                                        <span className="custom-control-description">8</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>CPU</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {cpu}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>IP</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {ipSliceStr}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>MEMORY</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {memory}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>SPLA</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {splaSliceStr}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>HDD</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {hdd}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Tag</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {rackTag}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Size</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {size}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Location</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className={classNameMap.formControlValue}>
                                            {rackLoc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );

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
                    <div className="top_btn_area assets_top">
                        <div className="float-right">
                            <ButtonToolbar>
                                <MatButton variant="contained" size="small"
                                           onClick={this.onList}>목록</MatButton>
                            </ButtonToolbar>
                        </div>
                    </div>
                    <div>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>테스트 용 테이블 입니다.</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                <form className="form-handle-infor container"
                                      role="form" data-toggle="validator">
                                    <div className="wrapper-form-infor-add">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">장비코드</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {deviceCode}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">IDC / 랙번호</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {idc}/{rack}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">장비구분</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {deviceType}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">제조사 / 모델명</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {manufacture}/{model}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">고객사</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {customerName}/{customer}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">소유권/소유권구분</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {ownership}/{ownershipDiv}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">소유업체명</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {ownerCompanyName}/{ownerCompany}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">임대기간</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {rentDateSliceStr}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">HW S/N</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {hwSn}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">입고일</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {warehousingDate}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">원가</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {cost}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">용도</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12">
                                                            <div className="form-control-value">
                                                                {purpose}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<div className="row form-infor__item">
                                                <div className="item-container">
                                                    <div className="form-infor__label">Environment</div>
                                                </div>
                                                <div className="col-lg-10 col-md-12">
                                                    <div className="dropdown show"><select
                                                        className="custom-select"
                                                        name="environment" required="">
                                                        <option>Open this select menu</option>
                                                        <option className="value-option">TST</option>
                                                        <option className="value-option">PRD</option>
                                                    </select></div>
                                                </div>
                                            </div>
                                            <div className="row form-infor__item">
                                                <div className="item-container">
                                                    <div className="form-infor__label">Date Created</div>
                                                </div>
                                                <div>
                                                    <div
                                                        className="form-infor__content-detail">09/21/2017
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">SKU</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12"><input
                                                            className="form-control" type="text"
                                                            placeholder="SKU" name="sku" minLength="3"
                                                            maxLength="15"
                                                            data-error="Sku should be number" required=""
                                                            disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-infor__item">
                                                        <div className="item-container">
                                                            <div className="form-infor__label">License</div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-12"><input
                                                            className="form-control add-license" type="text"
                                                            placeholder="License" name="license" minLength="3"
                                                            maxLength="15" data-error="License invalid"
                                                            required="" disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>*/}
                                            {/*<div className="row form-infor__item">
                                                <div className="item-container">
                                                    <div className="form-infor__label">Subscription</div>
                                                </div>
                                                <div className="col-lg-10 col-md-12"><input
                                                    className="form-control add-subscription" type="text"
                                                    placeholder="Subscription" name="subscription"
                                                    minLength="3"
                                                    maxLength="15" data-error="Subscription invalid"
                                                    required=""/>
                                                    <div className="help-block with-errors"/>
                                                </div>
                                            </div>
                                            <div className="row form-infor__item">
                                                <div className="item-container">
                                                    <div className="form-infor__label">Features</div>
                                                </div>
                                                <div className="col-lg-10 col-md-12"><input
                                                    className="form-control add-feature" type="text"
                                                    placeholder="Features" name="features" minLength="3"
                                                    maxLength="15" required=""/>
                                                    <div className="help-block with-errors"/>
                                                </div>
                                            </div>
                                            <div className="row wrapper-source-content">
                                                <div className="source__column">
                                                    <div className="form-infor__label item-container">Entitle
                                                        Sources
                                                    </div>
                                                </div>
                                                <div
                                                    className="source-list__column column-source list-sources">
                                                    <div className="list-checkbox checkboxes-add">
                                                        <span className="custom-control-description">1</span>
                                                        <span className="custom-control-description">2</span>
                                                        <span className="custom-control-description">3</span>
                                                        <span className="custom-control-description">4</span>
                                                        <span className="custom-control-description">5</span>
                                                        <span className="custom-control-description">6</span>
                                                        <span className="custom-control-description">7</span>
                                                        <span className="custom-control-description">8</span>
                                                    </div>
                                                </div>
                                                <div className="prefix-content__column">
                                                    <div className="form-infor__label entitle-sources__item">
                                                        <div className="content-prefix">Proprietary content
                                                            prefix
                                                        </div>
                                                        <div className="form-group"><textarea
                                                            className="textarea-prefix form-control"
                                                            name="contentPrefix" rows="3" minLength="3"
                                                            maxLength="15"
                                                            required=""/>
                                                            <div className="help-block with-errors"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>*/}
                                            {viewModalContent}
                                            <div className="row form-infor__item">
                                                <div className="item-container">
                                                    <div className="form-infor__label">기타사항</div>
                                                </div>
                                                <div className="col-lg-10 col-md-12">
                                                    {/*<input
                                                        className="form-control add-subscription" type="text"
                                                        placeholder="Subscription" name="subscription"
                                                        minLength="3"
                                                        maxLength="15" data-error="Subscription invalid"
                                                        required=""/>*/}
                                                    <div dangerouslySetInnerHTML={{__html: contents}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group float-right button-handle-form">
                                            {/* eslint-disable-next-line react/button-has-type */}
                                            <button className="btn btn-cancel" data-dismiss="modal">Cancel
                                            </button>
                                            <button className="btn btn-submit" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
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
                                                {user.id} [{date}]</span>
                                                        <div className="modal_form__form-group-field">
                                                            <textarea name="comment" value={comment}
                                                                      className="assets_comment"
                                                                      placeholder="댓글 입력 창"
                                                                      onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ButtonToolbar
                                                    className="assets_write__modal__footer_comment">
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
                                        <Button className="assets_write__modal_ok" outline={colored}
                                                color="primary"
                                                onClick={event => this.onUpdate(deviceCode)}>수정</Button>
                                    </ButtonToolbar>
                                </CardBody>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography style={{
                                    fontSize: "theme.typography.pxToRem(15)",
                                    fontWeight: "theme.typography.fontWeightRegular",
                                }}>장비 댓글</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <AssetsComment assetState={assetState} dispatch={dispatch} user={user}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
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
                    </div>
                    <Modal
                        isOpen={assetState.assetsPage === 'edit'}
                        modalClassName="ltr-support"
                        className="assets_write__modal-dialog
                            assets_write__modal-dialog">
                        <AssetsEdit assetState={assetState} dispatch={dispatch}
                                    onSubmit={this.handleSubmitEdit}/>
                    </Modal>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={modalWarring}
                        autoHideDuration={3000}
                        onClose={this.warringToggle}
                    >
                        <SnackbarContent
                            style={warringStyle}
                            message={(
                                <span id="client-snackbar" style={{lineHeight: "2"}}>
                                    {warringIcon}&nbsp;{warringContents}
                                 </span>
                            )}
                        />
                    </Snackbar>
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
