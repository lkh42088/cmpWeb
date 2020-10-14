import React, {Fragment} from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';

const VmInfoTable = (props) => {
    const {
        type, vm,
    } = props;

    return (
        <Card>
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
                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">회사</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.cpName}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">Micro Cloud SN</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.serialNumber}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">VM Name</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.name}</p>
                            </div>
                        </div>

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

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">VM 상태</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.currentStatus}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">IP Address</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.ipAddr}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">MAC Address</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.mac}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">내부접속</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">{vm.remoteAddr}</p>
                            </div>
                        </div>

                        <div className="vm__stats">
                            <div className="vm__stat">
                                <p className="vm__stat-title">외부접속</p>
                            </div>
                            <div className="vm__stat">
                                <p className="vm__stat-contents">-</p>
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
