import React, {Fragment, PureComponent} from 'react';
import {
    Card, Col, Button, ButtonToolbar, Modal,
} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import classNames from "classnames";
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import moment from "moment";
import Avatar from "react-avatar";
import MatButton from '@material-ui/core/Button';
import InputIcon from "@material-ui/icons/Input";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LaunchIcon from "@material-ui/icons/Launch";
import SendIcon from "@material-ui/icons/Send";
import TocIcon from '@material-ui/icons/Toc';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionActions';

import AssetsComment from "./AssetsComment";
import AssetsLog from "./AssetsLog";
import {
    getDeviceOriByIdx, setState, postDeviceOutFlag,
    postDevice, postDeviceComment, setAssetsPage,
} from "../../../../redux/actions/assetsAction";
import * as common from "../../../../lib/common";
import AssetsEdit from "./AssetsEdit";

class AssetsView extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        theme: PropTypes.object.isRequired,
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
            date: moment(new Date())
                .format("YYYY년MM월DD일"),

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
        //console.log("💍💍💍💍💍💍 --> : ", nextProps.assetState.stateVal);
        if (nextProps.assetState.stateVal.page === 'view') {
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
                /*case 'request':
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
                    };*/
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
        e.preventDefault();

        const {assetState, dispatch, user} = this.props;
        const {
            modal, comment, registerId,
        } = this.state;

        const submitData = ({
            idx: '',
            registerId: user.id,
            contents: comment,
            deviceCode: assetState.deviceByDeviceCode,
        });

        dispatch(postDeviceComment('create', assetState, submitData, 'view'));

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
                    rentDataStart = moment(values[arrData].start)
                        .format("YYYYMMDD");
                    rentDataEnd = `|${moment(values[arrData].end)
                        .format("YYYYMMDD")}`;
                    rentData = `${rentDataStart}${rentDataEnd}`;
                } else if (values[arrData] !== '' && values[arrData] !== undefined) {
                    rentData = values[arrData];
                } else {
                    rentData = "|";
                }
            } else if (arrData.indexOf("warehousingDate") !== -1) {
                let reWarehousingDate;

                if (values[arrData] === "0") {
                    reWarehousingDate = new Date();
                } else {
                    reWarehousingDate = values[arrData];
                }

                warehousingDate = moment(reWarehousingDate)
                    .format("YYYYMMDD");
            }
        }

        warehousingDate = warehousingDate.toString();

        let rackLoc;
        let rackCode;

        if (values.rackLoc !== undefined) {
            rackLoc = values.rackLoc.toString();
        } else {
            rackLoc = "0";
        }

        if (values.rackCode !== undefined) {
            rackCode = values.rackCode.toString();
        } else {
            rackCode = 0;
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
            rackLoc,
            rackCode,
            ip: IpArray,
            spla: SplaArray,
            rentDate: rentData,
            warehousingDate,
            monitoringFlag: '',
            monitoringMethod: '',
            firmwareVersion: values.firmwareVersion,
            warranty: values.warranty,
        });

        console.log("UPDATE 🙊🙊🙊 가공 전 : ", values);
        console.log("UPDATE 🙊🙊🙊 가공 후 : ", submitData);
        dispatch(postDevice('update', assetState, submitData, 'view'));
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
            page: 'view',
            type: 'device',
            division: 'outFlag',
            state: 'confirm',
        });

        dispatch(setState(stateVal));
    };

    reChange = (props) => {
        const foo = props;
        // eslint-disable-next-line array-callback-return,consistent-return
        const output = [...foo].map((char, index) => {
            if (char !== "") {
                return (
                    <li key={`${char}`}>{char}</li>
                );
            }
        });

        return <React.Fragment>{output}</React.Fragment>;
    };

    toggleOutFlag = (val, deviceCode) => {
        const {assetState, dispatch, user} = this.props;

        const submitData = ({
            userId: user.id,
            outFlag: val,
            deviceCode,
        });

        dispatch(postDeviceOutFlag(assetState, submitData, 'view'));
    };

    render() {
        const {
            assetState, dispatch, user, theme,
            title, message, colored, header,
        } = this.props;

        const {
            modal, comment, date, modalOpenFlag, warringClass, warringType, warringTitle,
            modalWarring, warringContents, warringStyle, warringIcon,
        } = this.state;

        let viewModalContent;
        let deviceValue = new Map([]);

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': colored,
            'assets_write__modal-dialog--header': header,
        });

        const classNameMap = {
            rowFormItem: "row form-infor__item",
            itemContainer: "item-container",
            formInforLabel: "form-infor__label",
            formControlValue: "form-control-value",
            textareaPreCont: "textarea-prefix form-control",
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
            rackLoc, firmwareVersion, warranty, customerName, ownerCompanyName, outFlag,
        } = deviceValue;

        let rentDateSliceStr;

        let ipSliceStrArray;
        let dpIpSliceStr;
        let splaSliceStrArray;
        let dpSplaSliceStr;
        let outFlagStr = "";
        let componentOutFlag;

        if (outFlag === true) {
            outFlagStr = (
                <span className="text_cor_red font-weight-bold">반출장비</span>
            );

            componentOutFlag = (
                <span role="button" tabIndex="0"
                      onClick={event => this.toggleOutFlag("0", deviceCode)}
                      onKeyDown={event => this.toggleOutFlag("0", deviceCode)}>
                <LaunchIcon fontSize="small"/>&nbsp;
                    반입
            </span>
            );
        } else if (outFlag === false) {
            outFlagStr = (
                <span className="text_cor_accent font-weight-bold">운영장비</span>
            );

            componentOutFlag = (
                <span role="button" tabIndex="0"
                      onClick={event => this.toggleOutFlag("1", deviceCode)}
                      onKeyDown={event => this.toggleOutFlag("1", deviceCode)}>
                    <InputIcon fontSize="small"/>&nbsp;
                    반출
                 </span>
            );
        }

        if (ip !== undefined && ip !== "|") {
            ipSliceStrArray = ip.split("|");
            dpIpSliceStr = this.reChange(ipSliceStrArray);
        }

        if (spla !== undefined && spla !== "|") {
            splaSliceStrArray = spla.split("|");
            dpSplaSliceStr = this.reChange(splaSliceStrArray);
        }
        /* if (ip !== undefined && ip !== "|") {
             ipSliceStrArray = ip.split("|");
             dpIpSliceStr = this.reChange(ipSliceStrArray);
         }

         if (spla !== undefined && spla !== "|") {
             splaSliceStrArray = spla.split("|");
             dpSplaSliceStr = this.reChange(splaSliceStrArray);
         }

         if (rentDate === "|" || rentDate === undefined) {
             rentDateSliceStr = "";
         } else {
             //rentDateSliceStr = rentDate.replace("|", "~");
             rentDateSliceStr = rentDate.split("|");
             inRentDate = (
                 `${rentDateSliceStr[0].substring(0, 4)}년${rentDateSliceStr[0].substring(4, 6)}월${rentDateSliceStr[0].substring(6, 8)}일`
             );
         }

         console.log("★★★★★ rack : ", rack);

         if (warehousingDate === null || warehousingDate === undefined) {
             inWarehousingDate = "error";
         } else {
             //inWarehousingDate = warehousingDate.substring(0,4);
             inWarehousingDate = (
                 `${warehousingDate.substring(0, 4)}년${warehousingDate.substring(4, 6)}월${warehousingDate.substring(6, 8)}일`
             );
         }*/
        /*
                console.log("★★★★★ rack : ", rack);

                let inRack = rack;
                if (rack === 0 || rack === "") {
                    inRack = "랙없음";
                }*/

        switch (assetState.deviceType) {
            case 'server':
                viewModalContent = (
                    <Fragment>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>CPU</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={common.textValueCut(cpu, undefined)} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>IP</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div
                                            className="source-list__column column-source list-sources">
                                            <div className="list-checkbox checkboxes-add">
                                                <ul>
                                                    {dpIpSliceStr}
                                                </ul>
                                            </div>
                                        </div>
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
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={common.textValueCut(memory, undefined)} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>SPLA</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div
                                            className="source-list__column column-source list-sources">
                                            <div className="list-checkbox checkboxes-add">
                                                <ul className="list">
                                                    {dpSplaSliceStr}
                                                </ul>
                                            </div>
                                        </div>
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
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={common.textValueCut(hdd, undefined)} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Tag</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={common.textValueCut(rackTag, undefined)} rows="1"
                                            disabled/>
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
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={common.textValueCut(size, undefined)} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Location</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={rackLoc} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'network':
                viewModalContent = (
                    <Fragment>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>FIRMWARE VERSION</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={firmwareVersion} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>IP</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div
                                            className="source-list__column column-source list-sources">
                                            <div className="list-checkbox checkboxes-add">
                                                <ul className="list">
                                                    {dpIpSliceStr}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Tag</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={rackTag} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Location</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={rackLoc} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            case 'part':
                viewModalContent = (
                    <Fragment>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Warranty</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={warranty} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={classNameMap.rowFormItem}>
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>Rack Size</div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={rackCode} rows="1"
                                            disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
                break;
            default:
                break;
        }

        return (

            <Card>
                <div className="top_btn_area assets_top">
                    <div className="float-left">
                        {/*<ButtonToolbar>
                            <MatButton
                                variant="contained"
                                onClick={this.onList}
                                startIcon={<TocIcon/>}>목록</MatButton>
                        </ButtonToolbar>*/}
                        <ButtonToolbar>
                            <span role="button" tabIndex="0"
                                  onClick={this.onList} onKeyDown={this.onList}>
                                    <TocIcon/>&nbsp;목록</span>
                        </ButtonToolbar>
                    </div>
                </div>
                <div>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header">
                            <Typography>장비 상세 정보</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="form-infor">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>운영여부</div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                {outFlagStr}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>&nbsp;</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <span className="float-right">
                                                    {componentOutFlag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>장비코드</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(deviceCode, undefined)}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>IDC / 랙번호
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(`${idc} / ${rack}`, "undefined / undefined")}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>장비구분</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(deviceType, undefined)}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>제조사 / 모델명
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(`${manufacture} / ${model}`, "undefined / undefined")}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>고객사</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${customerName} / ${customer}`}*/
                                                    value={common.textValueCut(`${customerName} / ${customer}`, "undefined / undefined")}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>소유권/소유권구분
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${ownership} / ${ownershipDiv}`}*/
                                                    value={common.textValueCut(`${ownership} / ${ownershipDiv}`, "undefined / undefined")}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>소유업체명</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${ownerCompanyName} / ${ownerCompany}`}*/
                                                    value={common.textValueCut(`${ownerCompanyName} / ${ownerCompany}`, "undefined / undefined")}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>임대기간</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                                /*value={`${textDateCut(rentDate, "rentDate")}`}*/
                                                    disabled
                                                    value={common.textDateCut(rentDate, "rentDate")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>HW S/N</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(hwSn, undefined)}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>입고일</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    /*value={`${inWarehousingDate}`}*/
                                                    value={common.textDateCut(warehousingDate, "warehousingDate")}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>원가</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(cost, undefined)}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classNameMap.rowFormItem}>
                                            <div className={classNameMap.itemContainer}>
                                                <div className={classNameMap.formInforLabel}>용도</div>
                                            </div>
                                            <div className="col-lg-8 col-md-12">
                                                <textarea
                                                    className={classNameMap.textareaPreCont}
                                                    rows="1"
                                                    value={common.textValueCut(purpose, undefined)}
                                                    disabled/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {viewModalContent}
                                <div className="row form-infor__item_etc">
                                    <div className={classNameMap.itemContainer}>
                                        <div className={classNameMap.formInforLabel}>기타사항</div>
                                    </div>
                                    <div className="col-lg-10">
                                        {/*<div className="form-control-value"
                                                     dangerouslySetInnerHTML={{__html: contents}}/>*/}
                                        <textarea
                                            className={classNameMap.textareaPreCont}
                                            value={contents} rows="5"
                                            disabled/>
                                    </div>
                                </div>

                                <div className="form-group float-right button-handle-form">
                                    <MatButton
                                        variant="contained"
                                        color="primary"
                                        onClick={event => this.onUpdate(deviceCode)}
                                        endIcon={<SendIcon/>}
                                    >
                                        수정
                                    </MatButton>
                                    <MatButton
                                        variant="contained"
                                        color="default"
                                        startIcon={<EditIcon/>}
                                        onClick={this.commentToggle}
                                    >
                                        댓글 작성
                                    </MatButton>
                                </div>
                                <Modal isOpen={modal}
                                       modalClassName={theme.className === 'theme-dark' ? (
                                           "ltr-support modal-class_dark"
                                       ) : (
                                           "ltr-support modal-class_light"
                                       )}
                                       className="comment-modal-dialog modal-comment-wrap">
                                    <form onSubmit={this.handleSubmit} className="modal-comment-form">
                                        <div className="modal-comment-wrap">
                                                <span className="modal_form__form-group-label text_cor_mat_p">
                                                    <Avatar className="topbar__avatar-img-list" name={user.id}
                                                            size="20"/>&nbsp;{user.name}({user.id}) [{date}]
                                                </span>
                                            <div className="modal_form__form-group-field"
                                                 style={{paddingTop: "5px"}}>
                                                <div className="chat__text-field">
                                                        <textarea className="chat__field-textarea"
                                                                  placeholder="Type here…"
                                                                  rows={8}
                                                                  name="comment" value={comment}
                                                                  onChange={this.handleChange}/>
                                                    <div
                                                        className="float-right button-handle-form">
                                                        <MatButton variant="contained" size="small"
                                                                   color="primary" type="submit"
                                                                   startIcon={<EditIcon/>}>
                                                            등록
                                                        </MatButton>
                                                        <MatButton variant="contained"
                                                                   size="small" color="default"
                                                                   onClick={this.commentToggle}>
                                                            닫기
                                                        </MatButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Modal>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header">
                            <Typography>장비 댓글</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AssetsComment assetState={assetState} dispatch={dispatch} user={user}
                                           theme={theme}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>장비 로그</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AssetsLog assetState={assetState} dispatch={dispatch}/>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <Modal
                    isOpen={assetState.assetsPage === 'edit'}
                    modalClassName={theme.className === 'theme-dark' ? (
                        "ltr-support modal-class_dark"
                    ) : (
                        "ltr-support modal-class_light"
                    )}
                    className="assets_write__modal-dialog
                            assets_write__modal-dialog">
                    <AssetsEdit assetState={assetState} dispatch={dispatch}
                                onSubmit={this.handleSubmitEdit} theme={theme}/>
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

        );
    }

    /*  // eslint-disable-next-line class-methods-use-this
      ReChange(props) {
          const foo = props;
          const replaceChar = '|';
          const output = [...foo].map(char => (
              <li>{char}</li>
          ));

          return <React.Fragment>{output}</React.Fragment>;
      }*/
}

export default reduxForm({
    form: 'horizontal_form', // a unique identifier for this form
})(withTranslation('common')(AssetsView));
