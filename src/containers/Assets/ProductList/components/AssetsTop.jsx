/* eslint-disable react/prop-types */
import React, { PureComponent, Fragment } from 'react';
import { Card, Modal, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from "classnames";
import moment from 'moment';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CreateIcon from "@material-ui/icons/Create";
import InputIcon from "@material-ui/icons/Input";
import LaunchIcon from "@material-ui/icons/Launch";

import AssetsWrite from "./AssetsWrite";
import {
    postDevice,
    postDeviceOutFlag, setState,
} from "../../../../redux/actions/assetsAction";

// eslint-disable-next-line react/no-redundant-should-component-update
export default class AssetsTop extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        theme: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            modalOpenFlag: false,
            modalWarring: false,
            warringContents: '',
            warringStyle: {
                backgroundColor: "",
            },
            warringIcon: '',
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (nextProps.assetState.stateVal.type === 'device'
            && nextProps.assetState.stateVal.division === 'outFlag') {
            switch (nextProps.assetState.stateVal.state) {
                case 'error':
                    return {
                        modalWarring: true,
                        warringContents: '요청하신 작업에 실패하였습니다.',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                case 'success':
                    return {
                        modalWarring: true,
                        warringContents: '요청하신 작업에 성공하였습니다.',
                        warringStyle: {
                            backgroundColor: "#43a047",
                        },
                        warringIcon: <CheckCircleIcon/>,
                    };
                case 'empty':
                    return {
                        modalWarring: true,
                        warringContents: '선택된 장비가 없습니다.',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                case 'confirm':
                    return {
                        modalWarring: false,
                        warringContents: '',
                        warringStyle: {
                            backgroundColor: "",
                        },
                        warringIcon: "",
                    };
                default:
                    break;
            }
        }
        return null;
    };

    toggle = (e) => {
        this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));
    };

    warringToggle = (e) => {
        const { dispatch } = this.props;

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

            dispatch(postDeviceOutFlag(assetState, submitData));
        }
    };

    handleSubmit = (values) => {
        const { assetState, dispatch, user } = this.props;

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

        console.log("TOP SUBMIT 가공 전 : ", values);
        console.log("TOP SUBMIT 가공 후: ", submitData);
        dispatch(postDevice('create', assetState, submitData));
        this.toggle();
    };

    render() {
        const { assetState, dispatch, theme } = this.props;

        const {
            modalOpenFlag, modalWarring, warringIcon,
            warringContents, warringStyle,
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
            <Card>
                <div className="top_btn_area">
                    <div className="float-left">
                        <ButtonToolbar>
                            <span role="button" tabIndex="0"
                                  onClick={this.toggle} onKeyDown={this.toggle}>
                                    <CreateIcon/>&nbsp;장비 등록</span>
                            {viewComponentOutFlag}
                        </ButtonToolbar>
                    </div>
                </div>
                <Modal
                    isOpen={modalOpenFlag}
                    modalClassName={theme.className === 'theme-dark' ? (
                        "ltr-support modal-class_dark"
                        ) : (
                        "ltr-support modal-class_light"
                        )}
                    className={`${modalClass}`}>
                    <AssetsWrite closeToggle={this.toggle} assetState={assetState} dispatch={dispatch}
                                 onSubmit={this.handleSubmit}
                                 theme={theme}
                    />
                </Modal>
                {/*1 : true , 0 : false */}
                {/*0 : 반입, 1 : 반출*/}
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
                                    {warringIcon} &nbsp;{warringContents}
                                 </span>
                        )}
                    />
                </Snackbar>
            </Card>
        );
    }
}
