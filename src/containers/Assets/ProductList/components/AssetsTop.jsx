/* eslint-disable react/prop-types */
import React, {PureComponent} from 'react';
import {
    Badge, Button, Card, CardBody, Col, Collapse, Modal, Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from "classnames";
import moment from 'moment';

import AssetsModal from "./AssetsModal";
import AssetsWrite from "./AssetsWrite";
import {postDevice} from "../../../../redux/actions/assetsAction";

function replacer(key, value) {
    console.log("key : ", key);
    console.log("value : ", value);
}

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
        };
    }

    toggle = (e) => {
        this.setState(prevState => ({modalOpenFlag: !prevState.modalOpenFlag}));
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

        console.log("========================================");
        console.log("IpArray : ", IpArray);
        console.log("SplaArray : ", SplaArray);
        console.log("manufacture : ", values.manufacture);
        console.log("model : ", values.model);
        console.log("IpArray : ", IpArray);
        console.log("========================================");

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
            rackLoc: values.rackLoc,
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
    };

    render() {
        const {assetState, dispatch} = this.props;

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
                    <CardBody className="search_panel__body">
                        <div className="search_panel_topbtn circle-legend">
                            <div className="float-left">
                                &nbsp;&nbsp;
                                <span className="circle__lit"/>장비반출&nbsp;&nbsp;
                                <div className="float-left" role="button" tabIndex="0" onClick={this.toggle}
                                     onKeyDown={this.toggle}>
                                    <span className="circle__eos"
                                          role="button" tabIndex="0"/>장비등록&nbsp;&nbsp;
                                </div>
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
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
