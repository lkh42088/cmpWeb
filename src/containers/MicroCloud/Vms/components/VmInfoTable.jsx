import React, {Fragment} from 'react';
import {
    Badge,
    Card, CardBody, Col,
} from 'reactstrap';
import {SnackbarProvider} from "notistack";

import image1 from "../../../../shared/img/temp/cubes.jpg";
import image5 from "../../../../shared/img/temp/alarm.png";
import image6 from "../../../../shared/img/temp/timearrow.png";

import imageSrc1 from "../../../../shared/img/temp/webdesign.jpg";
import imageSrc2 from "../../../../shared/img/temp/computer1.jpg";
import imageSrc3 from "../../../../shared/img/temp/battery.jpg";
import imageSrc4 from "../../../../shared/img/temp/laptop.jpg";
import imageSrc5 from "../../../../shared/img/temp/computer2.jpg";
import imageSrc6 from "../../../../shared/img/temp/online.png";
import imageSrc7 from "../../../../shared/img/temp/statistics.jpg";

const VmInfoTable = (props) => {
    const {
        type, vm,
    } = props;

    return (
        <Card style={{
            /*height: "20vh",*/
            height: "auto",
            /*margin: "10px auto",*/
        }}>
            {/*<img src={type === "setting" ? imageSrc4 : imageSrc5}
                 alt={type}/>*/}
            <CardBody className="vm__card">
                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-mainTitle" style={{
                            textAlign: "left",
                        }}>{type === "setting" ? "설치 정보" : "상태 정보"}</p>
                    </div>
                </div>

                {type === "setting" ? (
                    <Fragment>
                        {/*<div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">Company</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.cpName}</p>
                            </div>
                        </div>*/}

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">Micro Cloud <br/>SN</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.serialNumber}</p>
                            </div>
                        </div>

                        {/*<div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">VM Name</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.name}</p>
                            </div>
                        </div>*/}

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">Image</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.image}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">Network</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.network}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">CPU</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.cpu} cores</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">Ram</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.ram} Mbytes</p>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>

                        {/*<div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">VM 상태</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">
                                    {vm.currentStatus === 'running' ? (
                                        <Badge color="primary">&nbsp;running&nbsp;</Badge>
                                    ) : (
                                        <Badge color="secondary">&nbsp;{vm.currentStatus}&nbsp;</Badge>
                                        )}
                                    {vm.currentStatus}
                                </p>
                            </div>
                        </div>*/}

                        {/*<div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">VM 상태 01</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">
                                    test
                                    <Badge color="primary">Primary</Badge>
                                    <Badge color="secondary">Secondary</Badge>
                                    <Badge color="success">Success</Badge>
                                    <Badge color="danger">Danger</Badge>
                                    <Badge color="warning">Warning</Badge>
                                    <Badge color="info">Info</Badge>
                                    <Badge color="light">Light</Badge>
                                    <Badge color="dark">Dark</Badge>
                                </p>
                            </div>
                        </div>*/}

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">IP Address</p>
                                <p className="vm__stat-contents">{vm.ipAddr}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">MAC Address</p>
                                <p className="vm__stat-contents">{vm.mac}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">내부접속</p>
                                <p className="vm__stat-contents">{vm.remoteAddr}</p>
                            </div>
                        </div>
                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">외부접속</p>
                                <p className="vm__stat-contents">{vm.publicRemoteAddr}</p>
                            </div>
                        </div>
                    </Fragment>
                )}
            </CardBody>
        </Card>
    );
};
/*<Col md={12} lg={12} xl={12}>*/

export default VmInfoTable;
