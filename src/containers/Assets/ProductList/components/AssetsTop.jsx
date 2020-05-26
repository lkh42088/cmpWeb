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
        // Do something with the form values
        console.log("🤑🤑🤑🤑 ", values);
        console.log("🤑🤑🤑🤑 typeof ", typeof values);
        console.log("🤑🤑🤑🤑 Ip ", values.Ip);
        //const hasSubCode = values.data.some(d => (Number(d.CodeID) === Number(e.target.value)));
        let IpArray = '';
        let SplaArray = '';

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const arrData in values) {
            /*key3 :  Ip , value :  2
            AssetsTop.jsx:45 key3 :  Ip0 , value :  3*/
            console.log("arrData : ", arrData, ", value : ", values[arrData]);

            /*arrData :  Ip , value :  1
            AssetsTop.jsx:48 arrData :  Ip0 , value :  2
            AssetsTop.jsx:48 arrData :  Ip1 , value :  3
            AssetsTop.jsx:48 arrData :  Spla , value :  78
            AssetsTop.jsx:48 arrData :  Spla0 , value :  79*/

            if (arrData.indexOf("Ip") !== -1) {
                //IpArray = IpArray`|${values[arrData]}`;
                IpArray = `${IpArray}|${values[arrData]}`;
            } else if (arrData.indexOf("Spla") !== -1) {
                SplaArray = `${SplaArray}|${values[arrData]}`;
            }
        }

        console.log("🎩 IpArray : ", IpArray);
        console.log("🎩 SplaArray : ", SplaArray);


        const tempJson = JSON.stringify(JSON.stringify(values), replacer);

        console.log("tempJson : ", tempJson);

        // eslint-disable-next-line no-undef
        console.log("--> ", moment(values.RentDate.start).format("YYYY-MM-DD"));


        /*
Contents: "기타사항↵확인↵바람"
Cost: "5000"
Cpu: "cpu"
DeviceType: "8"
Hdd: "hdd"
HwSn: "hw"
Idc: "15"
Ip: "1.1.1.1"
Ip0: "2.2.2.2"
Ip1: "3.3.3.3"
Ip2: "3.3.3.3"
Memory: "memory"
Model: "10"
Purpos: "테스트용"
Rack: "87"
RentDate: {
            start: Fri May 01 2020 00:00:00 GMT+0900 (대한민국 표준시),
            end: Tue May 12 2020 00:00:00 GMT+0900 (대한민국 표준시)}
Spla: "587"
Spla0: "549"
WarehousingDate: Fri May 01 2020 00:00:00 GMT+0900 (대한민국 표준시) {}
__proto__: Object
        */


        const submitData = ({
            Contents: values.Contents,
            Cost: values.Cost,
            Cpu: values.Cpu,
            DeviceType: values.DeviceType,
            Hdd: values.Hdd,
            HwSn: values.HwSn,
            Memory: values.Memory,
            Model: values.Model,
            Purpos: values.Purpos,
            Idc: values.Idc,
            Rack: values.Rack,
            Spla: SplaArray,
            Ip: IpArray,
/*            Idx: '',
            OutFlag: 0,
            CommentCnt: 0,
            CommentLastDate: undefined,
            RegisterId: 'test_id',
            Password: values.Idx,
            RegisterName: values.Idx,
            RegisterEmail: values.Idx,
            RegisterDate: values.Idx,
            DeviceCode: values.Idx,
            Model: values.Idx,
            Contents: values.Contents,
            Customer: values.Idx,
            Manufacture: values.Idx,
            DeviceType: values.Idx,
            WarehousingDate: values.Idx,
            RentDate: values.Idx,
            Ownership: values.Idx,
            OwnershipDiv: values.Idx,
            OwnerCompany: values.Idx,
            HwSn: values.Idx,
            IDC: values.Idx,
            Rack: values.Idx,
            Cost: values.Cost,
            Purpos: values.Idx,
            Size: values.Idx,
            Spla: SplaArray,
            Ip: IpArray,
            Cpu: values.Cpu,
            Memory: values.Memory,
            Hdd: values.Hdd,
            MonitoringFlag: '',
            MonitoringMethod: '',*/

        });

        console.log("🙊🙊 : ", submitData);
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
