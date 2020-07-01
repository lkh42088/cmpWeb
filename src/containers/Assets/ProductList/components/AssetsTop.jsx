/* eslint-disable react/prop-types */
import React, {PureComponent, Fragment} from 'react';
import {
    Card, Col, Modal, ButtonToolbar,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from "classnames";
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CreateIcon from "@material-ui/icons/Create";
import InputIcon from "@material-ui/icons/Input";
import LaunchIcon from "@material-ui/icons/Launch";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import AssetsWrite from "./AssetsWrite";
import {
    fetchPosts,
    postDevice,
    postDeviceOutFlag, setState,
} from "../../../../redux/actions/assetsAction";
import {MenuTitleProps} from '../../../../shared/prop-types/ReducerProps';

// eslint-disable-next-line react/no-redundant-should-component-update
export default class AssetsTop extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            modalOpenFlag: false,
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
        /*console.log("nextProps : ", nextProps.assetState.stateVal);
        console.log("type : ", nextProps.assetState.stateVal.type);
        console.log("state : ", nextProps.assetState.stateVal.state);*/

        if (nextProps.assetState.stateVal.type === 'device'
            && nextProps.assetState.stateVal.division === 'outFlag') {
            switch (nextProps.assetState.stateVal.state) {
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
                case 'empty':
                    return {
                        modalWarring: true,
                        warringTitle: '경고',
                        warringContents: '선택된 장비가 없습니다.',
                        warringClass: 'modal-dialog--danger',
                        warringType: 'danger',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                case 'confirm':
                    return {
                        modalWarring: false,
                        warringTitle: '',
                        warringContents: '',
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

    toggle = (e) => {
        this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));
    };

    warringToggle = (e) => {
        const {assetState, dispatch} = this.props;
        //this.setState(prevState => ({modalWarring: !prevState.modalWarring}));

        const stateVal = ({
            type: 'device',
            division: 'outFlag',
            state: 'confirm',
        });

        dispatch(setState(stateVal));
    };

    toggleOutFlag = (val) => {
        let division = ',';
        let divisionCount = 0;
        let deviceCodeData = '';

        const {assetState, dispatch, user} = this.props;

        if (assetState.deviceSelected.size === undefined) {
            const stateVal = ({
                type: 'device',
                division: 'outFlag',
                state: 'empty',
            });

            dispatch(setState(stateVal));
        } else {
            // eslint-disable-next-line no-shadow
            assetState.deviceSelected.forEach((value, key, map) => {
                //console.log(`14--->${key}$${value}`);
                if (value === true) {
                    if (divisionCount <= 0) {
                        division = '';
                    } else {
                        division = ',';
                    }
                    divisionCount += 1;
                    deviceCodeData = `${deviceCodeData}${division}${key}`;
                }
            });

            //todo user setting
            const submitData = ({
                userId: user.id,
                outFlag: val,
                deviceCode: deviceCodeData,
            });

            //postDeviceOutFlag
            // 반출 요청을 할거다....(1)
            // 반입은 (0)....
            dispatch(postDeviceOutFlag(assetState, submitData));
        }
    };

    handleSubmit = (values) => {
        const {assetState, dispatch, user} = this.props;

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
                if (values[arrData].start !== null && values[arrData].start !== undefined) {
                    rentDataStart = moment(values[arrData].start).format("YYYYMMDD");
                } else {
                    rentDataStart = null;
                }

                if (rentDataStart !== null) {
                    if (values[arrData].end !== null) {
                        rentDataEnd = `|${moment(values[arrData].end).format("YYYYMMDD")}`;
                    } else {
                        rentDataEnd = "|";
                    }
                    rentData = `${rentDataStart}${rentDataEnd}`;
                } else {
                    rentData = "|";
                }
            } else if (arrData.indexOf("warehousingDate") !== -1) {
                warehousingDate = moment(values[arrData]).format("YYYYMMDD");
            }
        }

        let rackLog;

        if (values.rackLoc !== undefined) {
            rackLog = values.rackLoc.toString();
        } else {
            rackLog = 0;
        }

        const submitData = ({
            outFlag: '',
            commentCnt: '',
            commentLastDate: '',
            registerId: user.id,
            registerDate: '',
            model: values.model,
            manufacture: values.manufacture,
            contents: values.contents,
            customer: values.customer,
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

        console.log("TOP 🙊🙊🙊 가공 전 : ", values);
        console.log("TOP 🙊🙊🙊 가공 후: ", submitData);
        dispatch(postDevice('create', assetState, submitData));
        this.toggle(); // modal close
    };

    render() {
        const {assetState, dispatch, user} = this.props;

        const {
            modalOpenFlag, modalWarring, warringTitle, warringIcon,
            warringContents, warringClass, warringType, warringStyle,
        } = this.state;

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        const componentOperatinng = (
            <span role="button" tabIndex="0"
                  onClick={event => this.toggleOutFlag("1")}
                  onKeyDown={event => this.toggleOutFlag("1")}>
                    <InputIcon/>&nbsp;
                반출
            </span>
        );

        const componentCarrying = (
            <span role="button" tabIndex="0"
                  onClick={event => this.toggleOutFlag("0")}
                  onKeyDown={event => this.toggleOutFlag("0")}>
                <LaunchIcon/>&nbsp;
                반입
            </span>
        );

        const componentOutFlagAll = (
            <span role="button" tabIndex="0"
                  onClick={event => this.toggleOutFlag("1")}
                  onKeyDown={event => this.toggleOutFlag("1")}>
                <AutorenewIcon/>&nbsp;
                반입/반출 자동 {/*없는 기능 ...*/}
            </span>
        );

        let viewComponentOutFlag;

        if (assetState.searchRd.operatingFlag === true && assetState.searchRd.carryingFlag === true) {
            viewComponentOutFlag = (
                <Fragment>
                    &nbsp;
                </Fragment>
            );
        } else if (assetState.searchRd.operatingFlag === true && assetState.searchRd.carryingFlag === false) {
            viewComponentOutFlag = (
                <Fragment>
                    {componentOperatinng}
                </Fragment>
            );
        } else if (assetState.searchRd.operatingFlag === false && assetState.searchRd.carryingFlag === true) {
            viewComponentOutFlag = (
                <Fragment>
                    {componentCarrying}
                </Fragment>
            );
        } else if (assetState.searchRd.operatingFlag === false && assetState.searchRd.carryingFlag === false) {
            viewComponentOutFlag = "";
        }

        return (
            <Col md={12} lg={12}>
                <Card>
                    <div className="top_btn_area">
                        <div className="float-left">
                            <ButtonToolbar>
                                {/*className="top_btn_black_dep3"*/}
                                <span role="button" tabIndex="0"
                                      onClick={this.toggle} onKeyDown={this.toggle}>
                                <CreateIcon/>&nbsp;
                                    장비 등록</span>
                                {viewComponentOutFlag}
                            </ButtonToolbar>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalOpenFlag}
                        modalClassName="ltr-support"
                        className={`assets_write__modal-dialog 
                            assets_write__modal-dialog ${modalClass}`}
                    >
                        <AssetsWrite closeToggle={this.toggle} assetState={assetState} dispatch={dispatch}
                                     title="장비 확인" message="자산관리 > 장비 확인 페이지 입니다."
                                     onSubmit={this.handleSubmit}
                        />
                    </Modal>
                    {/*1 : true , 0 : false */}
                    {/*0 : 반입, 1 : 반출*/}
                    {/*<Modal
                        isOpen={modalWarring}
                        toggle={this.warringToggle}
                        modalClassName="ltr-support"
                        className={`modal-dialog-dialog ${warringClass}`}
                    >
                        <div className="modal__header">
                            <button className="lnr lnr-cross modal__close-btn" type="button"
                                    onClick={this.warringToggle}/>
                            <span className="lnr lnr-cross-circle modal__title-icon"/>
                            <h4 className="text-modal  modal__title">{warringTitle}</h4>
                        </div>
                        <div className="modal__body">
                            {warringContents}
                        </div>
                        <ButtonToolbar className="modal__footer">
                            <Button className="modal_ok" outline={warringType} color={warringType}
                                    onClick={this.warringToggle}>Ok</Button>
                        </ButtonToolbar>
                    </Modal>*/}
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
                            /*message={`${warringIcon} ${warringContents}`}*/
                            style={warringStyle}
                            message={(
                                <span id="client-snackbar" style={{lineHeight: "2"}}>
                                    {warringIcon}&nbsp;{warringContents}
                                 </span>
                            )}
                            /*action={(
                                <Fragment>
                                    <MatButton color="secondary" size="small" onClick={this.warringToggle}>
                                        Ok
                                    </MatButton>
                                    <IconButton size="small" aria-label="close" color="inherit"
                                                onClick={this.warringToggle}>
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </Fragment>
                            )}*/
                        />
                    </Snackbar>
                </Card>
            </Col>
        );
    }
}

//export default withSnackbar(AssetsTop);

/*export default withRouter(connect(state => ({
    user: state.user,
    menuTitle: state.menuTitle,
}))(AssetsTop));*/
