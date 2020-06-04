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

        let IpArray = '';
        let SplaArray = '';
        let rentDataStart;
        let rentDataEnd;
        let rentData = '|';
        let warehousingDate = '';

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in values) {
            //console.log("arrData : ", arrData, ", value : ", values[arrData]);

            if (arrData.indexOf("ip") !== -1) {
                IpArray = `${IpArray}|${values[arrData]}`;
            } else if (arrData.indexOf("spla") !== -1) {
                SplaArray = `${SplaArray}|${values[arrData]}`;
            } else if (arrData.indexOf("rentDate") !== -1) {
                if (values[arrData].start !== null) {
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

        // const tempJson = JSON.stringify(JSON.stringify(values), replacer);

        const submitData = ({
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

        /*const submitData = ({
            outFlag: true,
            commentCnt: 0,
            commentLastDate: "",
            registerId: "lkb",
            contents: "들어가자~↵와~",
            cost: "3243",
            cpu: "cpu",
            customer: "",
            deviceCode: "CBS09998",
            deviceType: "7",
            hdd: "hdd2",
            hwSn: "hw",
            idc: "15",
            ip: "|22.2.2.2|1.1.1.1",
            manufacture: undefined,
            memory: "memory",
            model: "39",
            monitoringFlag: "",
            monitoringMethod: "",
            ownerCompany: "",
            ownership: "1",
            ownershipDiv: "4",
            purpos: "5000",
            rack: "87",
            rackLoc: "12",
            rackTag: "rack tag",
            registerDate: "",
            rentDate: "20200501|20200504",
            size: "23",
            spla: "|587|88",
            warehousingDate: "20200507",
        });*/

        console.log("🙊🙊🙊🙊🙊🙊🙊 : ", submitData);
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
