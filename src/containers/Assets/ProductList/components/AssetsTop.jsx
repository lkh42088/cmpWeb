/* eslint-disable react/prop-types */
import React, {PureComponent} from 'react';
import {
    Badge, Button, Card, CardBody, Col, Collapse, Modal, Table, ButtonToolbar,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from "classnames";
import moment from 'moment';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Select from 'react-select';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import AssetsModal from "./AssetsModal";
import AssetsWrite from "./AssetsWrite";
import {
    fetchPosts,
    postDevice,
    postDeviceOutFlag,
    setDeviceOutFlag,
} from "../../../../redux/actions/assetsAction";
import {UserProps, MenuTitleProps} from '../../../../shared/prop-types/ReducerProps';

function replacer(key, value) {
    console.log("key : ", key);
    console.log("value : ", value);
}

class AssetsTop extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        assetState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        menuTitle: MenuTitleProps.isRequired,
    };

    constructor() {
        super();
        this.state = {
            modalOpenFlag: false,
        };
    }

    toggle = (e) => {
        this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));
    };

    toggleOutFlag = (val) => {
        let division = ',';
        let divisionCount = 0;
        let deviceCodeData = '';
        console.log("toggleOutFlag start");
        const {assetState, dispatch} = this.props;

        console.log("length : ", assetState.deviceSelected.length);
        console.log("size : ", assetState.deviceSelected.size);

        if (assetState.deviceSelected.size === undefined) {
            // modal로 경고등 띄우기
            // alert("선택된 장비가 없습니다.");
            console.log("선택된 장비가 없습니다.");
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
                userId: 'lkb',
                outFlag: '1',
                deviceCode: deviceCodeData,
            });

            //console.log("value : ", value);
            //postDeviceOutFlag
            // 반출 요청을 할거다....(1)
            // 반입은 (0)....
            dispatch(postDeviceOutFlag(assetState, submitData));
        }
    };

    handleSubmit = (values) => {
        const {assetState, dispatch} = this.props;

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

        console.log("values.rackLoc : ", values.rackLoc);

        if (values.rackLoc !== undefined) {
            rackLog = values.rackLoc.toString();
        } else {
            rackLog = 0;
        }

        const submitData = ({
            outFlag: '',
            commentCnt: '',
            commentLastDate: '',
            registerId: 'lkb',
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

    setToggleOutFlag = (outFlag) => {
        const {assetState, dispatch} = this.props;

        /*dispatch(setDeviceOutFlag(outFlag));*/
        dispatch(setDeviceOutFlag(outFlag));
        dispatch(fetchPosts(assetState));
    };

    render() {
        const {assetState, dispatch, menuTitle} = this.props;

        const {
            modalOpenFlag,
        } = this.state;

        const modalClass = classNames({
            'assets_write__modal-dialog': true,
            'assets_write__modal-dialog--colored': false,
            'assets_write__modal-dialog--header': false,
        });

        return (
            <Col md="12">
                <Card>
                    {/*<div className="search_panel_topbtn">
                            <span className="topbar__menuTitle">
                                    {menuTitle.title}&nbsp;
                                <span className="topbar__menuTitle-side">
                                    {menuTitle.subTitle}
                                </span>
                            </span>
                    </div>*/}
                    <div className="search_panel_topbtn">
                        <div className="float-left circle-legend">
                            &nbsp;&nbsp;
                            {/*<span className="circle__lit"/>장비반출&nbsp;&nbsp;*/}
                            <div className="float-left" role="button" tabIndex="0"
                                 onClick={event => this.setToggleOutFlag('0')}
                                 onKeyDown={event => this.setToggleOutFlag('0')}>
                                    <span className="circle__ste"
                                          role="button" tabIndex="0"/>운영장비&nbsp;&nbsp;
                            </div>
                            <div className="float-left" role="button" tabIndex="0"
                                 onClick={event => this.setToggleOutFlag("1")}
                                 onKeyDown={event => this.setToggleOutFlag("1")}>
                                    <span className="circle__eth"
                                          role="button" tabIndex="0"/>반출장비&nbsp;&nbsp;
                            </div>
                        </div>
                        <div className="float-right">
                            <ButtonToolbar>
                                    <span role="button" tabIndex="0"
                                          onClick={this.toggle} onKeyDown={this.toggle}
                                          className="top_btn_black_dep2">
                                        장비 등록</span>
                                {
                                    assetState.deviceOutFlag === '0'
                                        ? (
                                            <span role="button" tabIndex="0"
                                                  onClick={event => this.toggleOutFlag("1")}
                                                  onKeyDown={event => this.toggleOutFlag("1")}
                                                  className="top_btn_black_dep3">
                                                반출
                                            </span>
                                        ) : (
                                            <span role="button" tabIndex="0"
                                                  onClick={event => this.toggleOutFlag("0")}
                                                  onKeyDown={event => this.toggleOutFlag("0")}
                                                  className="top_btn_black_dep3">
                                                반입
                                            </span>
                                        )
                                }
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
                </Card>
            </Col>
        );
    }
}

export default withRouter(connect(state => ({
    user: state.user,
    menuTitle: state.menuTitle,
}))(AssetsTop));
