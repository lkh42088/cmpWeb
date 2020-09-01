import React from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';

const VmMain = () => (
    /*<Col md={12} lg={12} xl={12}>*/
    <Col style={{
        width: "250px",
        height: "90vh",
    }}>
        <Card>
            <CardBody className="vm__card">
                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-mainTitle">VM 이름</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">CPU</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">4 cores</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">RAM</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">8,192 MB</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">HDD</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">100 GB</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">IP</p>
                    </div>
                    <div className="vm__stat">
                        <p className="vm__stat-title">192.168.0.89</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title">내부접속 192.168.0.100:15001</p>
                    </div>
                </div>

                <div className="vm__stats">
                    <div className="vm__stat">
                        <p className="vm__stat-title"> 외부접속 119.1.1.10:15001</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    </Col>
);

export default VmMain;
