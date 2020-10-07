import React from 'react';
import {
    Card, CardBody, Col,
} from 'reactstrap';

const Component03 = () => (
    /*<Col md={12} lg={12} xl={12}>*/
        <Card style={{
            height: "20vh",
        }}>
            <CardBody className="vm__card">
                <div className="vm__stats" style={{
                    borderBottom: "none",
                }}>
                    <div className="vm__stat">
                        <p className="vm__stat-mainTitle" style={{
                            textAlign: "left",
                        }}>Snapshot 설정</p>
                    </div>
                </div>

                <div className="vm__stats" style={{
                    borderBottom: "none",
                }}>
                    <div className="vm__stat">
                        <p className="vm__stat-title" style={{
                            fontSize: "1.5rem",
                        }}> 1 Day 23시 5분</p>
                    </div>
                </div>
            </CardBody>
        </Card>
);

export default Component03;
